import NumberFormat, { DECIMAL_SYMBOLS } from './numberFormat'
import { AutoDecimalDigitsNumberMask, DefaultNumberMask } from './numberMask'
import { count } from './stringUtils'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1

export const DEFAULT_OPTIONS = {
  locale: undefined,
  currency: undefined,
  valueAsInteger: false,
  distractionFree: true,
  precision: undefined,
  autoDecimalDigits: false,
  valueRange: undefined,
  allowNegative: true,
  useGrouping: true
}

export class NumberInput {
  constructor (el, options) {
    this.el = el
    this.numberValue = null
    this.addEventListener()
    this.init(options)
    this.setValue(this.currencyFormat.parse(this.el.value))
  }

  init (options) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.autoDecimalDigits = this.options.autoDecimalDigits
    this.valueAsInteger = this.options.valueAsInteger
    this.allowNegative = this.options.allowNegative
    this.useGrouping = this.options.useGrouping
    this.hideCurrencySymbolOnFocus = this.options.distractionFree === true || !!(this.options.distractionFree || {}).hideCurrencySymbol
    this.hideNegligibleDecimalDigitsOnFocus = this.options.distractionFree === true || !!(this.options.distractionFree || {}).hideNegligibleDecimalDigits
    this.hideGroupingSymbolOnFocus = this.options.distractionFree === true || !!(this.options.distractionFree || {}).hideGroupingSymbol
    this.valueRange = this.options.valueRange

    if (this.options.autoDecimalDigits) {
      this.hideNegligibleDecimalDigitsOnFocus = false
      this.el.setAttribute('inputmode', 'numeric')
    } else {
      this.el.setAttribute('inputmode', 'decimal')
    }
    this.currencyFormat = new NumberFormat(this.options)
    this.numberMask = this.options.autoDecimalDigits ? new AutoDecimalDigitsNumberMask(this.currencyFormat) : new DefaultNumberMask(this.currencyFormat)
  }

  setOptions (options) {
    this.init(options)
    this.applyFixedFractionFormat(this.numberValue, true)
  }

  dispatchEvent (eventName) {
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent(eventName, true, true, { ...this.getValue() })
    this.el.dispatchEvent(event)
  }

  applyFixedFractionFormat (number, forcedChange) {
    this.format(this.currencyFormat.format(this.validateValueRange(number)))
    if (number !== this.numberValue || forcedChange) {
      this.dispatchEvent('change')
    }
  }

  getValue () {
    const numberValue = this.valueAsInteger && this.numberValue != null ? this.toInteger(this.numberValue) : this.numberValue
    return {
      number: numberValue,
      formatted: this.formattedValue
    }
  }

  setValue (value) {
    const newValue = this.valueAsInteger && value != null ? this.toFloat(value) : value
    if (newValue !== this.numberValue) {
      this.applyFixedFractionFormat(newValue)
    }
  }

  toInteger (number) {
    return Number(number.toFixed(this.currencyFormat.maximumFractionDigits).split('.').join(''))
  }

  toFloat (value) {
    return value / Math.pow(10, this.currencyFormat.maximumFractionDigits)
  }

  validateValueRange (value) {
    if (value != null) {
      let { min, max } = this.valueRange || {}
      min = min !== undefined ? Math.max(min, this.toFloat(-MAX_SAFE_INTEGER)) : this.toFloat(-MAX_SAFE_INTEGER)
      max = max !== undefined ? Math.min(max, this.toFloat(MAX_SAFE_INTEGER)) : this.toFloat(MAX_SAFE_INTEGER)
      value = Math.min(Math.max(value, min), max)
    }
    return value
  }

  format (value, hideNegligibleDecimalDigits = false) {
    if (value != null) {
      if (this.decimalSymbolInsertedAt !== undefined) {
        value = this.currencyFormat.normalizeDecimalSymbol(value, this.decimalSymbolInsertedAt)
        this.decimalSymbolInsertedAt = undefined
      }
      const conformedValue = this.numberMask.conformToMask(value, this.formattedValue)
      let formattedValue
      if (typeof conformedValue === 'object') {
        const { numberValue, fractionDigits } = conformedValue
        let { maximumFractionDigits, minimumFractionDigits } = this.currencyFormat
        if (this.focus) {
          minimumFractionDigits = maximumFractionDigits
        }
        minimumFractionDigits = hideNegligibleDecimalDigits
          ? fractionDigits.replace(/0+$/, '').length
          : Math.min(minimumFractionDigits, fractionDigits.length)
        formattedValue = this.toInteger(Math.abs(numberValue)) > MAX_SAFE_INTEGER
          ? this.formattedValue
          : this.currencyFormat.format(numberValue, {
            useGrouping: this.useGrouping && !(this.focus && this.hideGroupingSymbolOnFocus),
            minimumFractionDigits,
            maximumFractionDigits
          })
      } else {
        formattedValue = conformedValue
      }
      if (!this.allowNegative) {
        formattedValue = formattedValue.replace(this.currencyFormat.negativePrefix, this.currencyFormat.prefix)
      }
      if (this.focus && this.hideCurrencySymbolOnFocus) {
        formattedValue = formattedValue
          .replace(this.currencyFormat.negativePrefix, this.currencyFormat.minusSymbol)
          .replace(this.currencyFormat.prefix, '')
          .replace(this.currencyFormat.suffix, '')
      }

      this.el.value = formattedValue
      this.numberValue = this.currencyFormat.parse(formattedValue)
    } else {
      this.el.value = this.numberValue = null
    }
    this.formattedValue = this.el.value
    this.dispatchEvent('input')
  }

  addEventListener () {
    this.el.addEventListener('input', (e) => {
      if (!e.detail) {
        const { value, selectionStart } = this.el
        if (DECIMAL_SYMBOLS.includes(e.data)) {
          this.decimalSymbolInsertedAt = selectionStart - 1
        }
        this.format(value)
        if (this.focus) {
          const getCaretPositionAfterFormat = () => {
            const { prefix, suffix, decimalSymbol, maximumFractionDigits, groupingSymbol } = this.currencyFormat

            let caretPositionFromLeft = value.length - selectionStart
            const newValueLength = this.formattedValue.length
            if (this.formattedValue.substr(selectionStart, 1) === groupingSymbol && count(this.formattedValue, groupingSymbol) === count(value, groupingSymbol) + 1) {
              return newValueLength - caretPositionFromLeft - 1
            }

            if (decimalSymbol) {
              const decimalSymbolPosition = value.indexOf(decimalSymbol) + 1
              if (Math.abs(newValueLength - value.length) > 1 && selectionStart <= decimalSymbolPosition) {
                return this.formattedValue.indexOf(decimalSymbol) + 1
              } else {
                if (!this.autoDecimalDigits && selectionStart > decimalSymbolPosition) {
                  if (this.currencyFormat.onlyDigits(value.substr(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
                    caretPositionFromLeft -= 1
                  }
                }
              }
            }
            return this.hideCurrencySymbolOnFocus ? newValueLength - caretPositionFromLeft : Math.max(newValueLength - Math.max(caretPositionFromLeft, suffix.length), prefix.length)
          }
          this.setCaretPosition(getCaretPositionAfterFormat())
        }
      }
    }, { capture: true })

    this.el.addEventListener('focus', () => {
      this.focus = true
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = this.el
        if ((this.hideCurrencySymbolOnFocus || this.hideGroupingSymbolOnFocus || this.hideNegligibleDecimalDigitsOnFocus) && value) {
          this.format(value, this.hideNegligibleDecimalDigitsOnFocus)
        }
        if (Math.abs(selectionStart - selectionEnd) > 0) {
          this.setCaretPosition(0, this.el.value.length)
        } else {
          const getSelectionStart = () => {
            const { prefix, suffix, groupingSymbol } = this.currencyFormat
            if (!this.hideCurrencySymbolOnFocus) {
              if (selectionStart > value.length - suffix.length) {
                return this.formattedValue.length - suffix.length
              } else if (selectionStart < prefix.length) {
                return prefix.length
              }
            }
            let result = selectionStart
            if (this.hideCurrencySymbolOnFocus) {
              result -= prefix.length
            }
            if (this.hideGroupingSymbolOnFocus) {
              result -= count(value.substring(0, selectionStart), groupingSymbol)
            }
            return result
          }
          this.setCaretPosition(getSelectionStart())
        }
      })
    })

    this.el.addEventListener('blur', () => {
      this.focus = false
      if (this.numberValue != null) {
        this.applyFixedFractionFormat(this.numberValue)
      }
    })

    this.el.addEventListener('change', (e) => {
      if (!e.detail) {
        this.dispatchEvent('change')
      }
    })
  }

  setCaretPosition (start, end = start) { this.el.setSelectionRange(start, end) }
}
