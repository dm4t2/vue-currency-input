import NumberFormat, { DECIMAL_SYMBOLS } from './numberFormat'
import { AutoDecimalModeNumberMask, DefaultNumberMask } from './numberMask'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition } from './caretPosition'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1

export class NumberInput {
  constructor (el, options, callbackFns) {
    this.el = el
    this.callbackFns = callbackFns
    this.numberValue = null
    this.addEventListener()
    this.init(options)
    this.setValue(this.currencyFormat.parse(this.el.value))
  }

  init (newOptions) {
    const options = { ...newOptions }
    const { distractionFree, autoDecimalMode, valueRange } = options
    if (typeof distractionFree === 'boolean') {
      options.distractionFree = {
        hideCurrencySymbol: distractionFree,
        hideNegligibleDecimalDigits: distractionFree,
        hideGroupingSymbol: distractionFree
      }
    }
    if (valueRange) {
      options.valueRange = {
        min: valueRange.min !== undefined ? Math.max(valueRange.min, -MAX_SAFE_INTEGER) : -MAX_SAFE_INTEGER,
        max: valueRange.max !== undefined ? Math.min(valueRange.max, MAX_SAFE_INTEGER) : MAX_SAFE_INTEGER
      }
    } else {
      options.valueRange = {
        min: -MAX_SAFE_INTEGER,
        max: MAX_SAFE_INTEGER
      }
    }
    if (autoDecimalMode) {
      options.distractionFree.hideNegligibleDecimalDigits = false
      this.el.setAttribute('inputmode', 'numeric')
    } else {
      this.el.setAttribute('inputmode', 'decimal')
    }
    this.options = options
    this.currencyFormat = new NumberFormat(this.options)
    this.numberMask = options.autoDecimalMode ? new AutoDecimalModeNumberMask(this.currencyFormat) : new DefaultNumberMask(this.currencyFormat)
  }

  setOptions (options) {
    this.init(options)
    this.applyFixedFractionFormat(this.numberValue, true)
  }

  applyFixedFractionFormat (number, forcedChange) {
    this.format(number != null ? this.currencyFormat.format(this.validateValueRange(number)) : null)
    if (number !== this.numberValue || forcedChange) {
      this.callbackFns.onChange(this.getValue())
    }
  }

  getValue () {
    return this.currencyFormat.parse(this.formattedValue, this.options.valueAsInteger)
  }

  setValue (value) {
    const newValue = this.options.valueAsInteger && value != null ? value / Math.pow(10, this.currencyFormat.maximumFractionDigits) : value
    if (newValue !== this.numberValue) {
      this.applyFixedFractionFormat(newValue)
    }
  }

  validateValueRange (value) {
    const { min, max } = this.options.valueRange
    return Math.min(Math.max(value, min), max)
  }

  updateInputValue (value, hideNegligibleDecimalDigits = false) {
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
        formattedValue = numberValue > MAX_SAFE_INTEGER
          ? this.formattedValue
          : this.currencyFormat.format(numberValue, {
            useGrouping: !(this.focus && this.options.distractionFree.hideGroupingSymbol),
            minimumFractionDigits,
            maximumFractionDigits
          })
      } else {
        formattedValue = conformedValue
      }
      if (!this.options.allowNegative) {
        formattedValue = formattedValue.replace(this.currencyFormat.negativePrefix, this.currencyFormat.prefix)
      }
      if (this.focus && this.options.distractionFree.hideCurrencySymbol) {
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
  }

  format (value) {
    this.updateInputValue(value)
    this.callbackFns.onInput(this.getValue())
  }

  addEventListener () {
    this.el.addEventListener('input', () => {
      const { value, selectionStart } = this.el
      this.format(value)
      if (this.focus) {
        this.setCaretPosition(getCaretPositionAfterFormat(this.formattedValue, value, selectionStart, this.currencyFormat, this.options))
      }
    }, { capture: true })

    this.el.addEventListener('focus', () => {
      this.focus = true
      const { hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = this.options.distractionFree
      if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
        setTimeout(() => {
          const { value, selectionStart, selectionEnd } = this.el
          if (value) {
            this.updateInputValue(this.el.value, hideNegligibleDecimalDigits)
          }
          if (Math.abs(selectionStart - selectionEnd) > 0) {
            this.setCaretPosition(0, this.el.value.length)
          } else {
            this.setCaretPosition(getDistractionFreeCaretPosition(this.currencyFormat, this.options, value, selectionStart))
          }
        })
      }
    })

    this.el.addEventListener('keypress', (e) => {
      if (DECIMAL_SYMBOLS.includes(e.key)) {
        this.decimalSymbolInsertedAt = this.el.selectionStart
      }
    })

    this.el.addEventListener('blur', () => {
      this.focus = false
      if (this.numberValue != null) {
        this.applyFixedFractionFormat(this.numberValue)
      }
    })

    this.el.addEventListener('change', () => {
      this.callbackFns.onChange(this.getValue())
    })
  }

  setCaretPosition (start, end = start) { this.el.setSelectionRange(start, end) }
}
