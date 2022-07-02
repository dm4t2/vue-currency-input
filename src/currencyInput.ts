import CurrencyFormat, { DECIMAL_SEPARATORS } from './currencyFormat'
import { AutoDecimalDigitsInputMask, DefaultInputMask, InputMask } from './inputMask'
import { count } from './utils'
import { CurrencyDisplay, CurrencyInputOptions, CurrencyInputValue, ValueScaling } from './api'

export const DEFAULT_OPTIONS = {
  locale: undefined,
  currency: undefined,
  currencyDisplay: undefined,
  hideGroupingSeparatorOnFocus: true,
  hideCurrencySymbolOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  precision: undefined,
  autoDecimalDigits: false,
  valueRange: undefined,
  useGrouping: true,
  valueScaling: undefined
}

export class CurrencyInput {
  private readonly el: HTMLInputElement
  private options!: CurrencyInputOptions
  private numberValue: number | null
  private currencyFormat!: CurrencyFormat
  private decimalSymbolInsertedAt?: number
  private numberMask!: InputMask
  private formattedValue!: string
  private focus!: boolean
  private minValue!: number
  private maxValue!: number
  private valueScaling: number | undefined
  private valueScalingFractionDigits!: number

  constructor(el: HTMLInputElement, options: CurrencyInputOptions) {
    this.el = el
    this.numberValue = null
    this.addEventListener()
    this.init(options)
    this.setValue(this.currencyFormat.parse(this.el.value))
  }

  setOptions(options: CurrencyInputOptions): void {
    this.init(options)
    this.applyFixedFractionFormat(this.numberValue, true)
  }

  getValue(): CurrencyInputValue {
    const numberValue = this.valueScaling && this.numberValue != null ? this.toInteger(this.numberValue, this.valueScaling) : this.numberValue
    return { number: numberValue, formatted: this.formattedValue }
  }

  setValue(value: number | null): void {
    const newValue = this.valueScaling !== undefined && value != null ? this.toFloat(value, this.valueScaling) : value
    if (newValue !== this.numberValue) {
      this.applyFixedFractionFormat(newValue)
    }
  }

  private dispatchEvent(eventName: string) {
    this.el.dispatchEvent(new CustomEvent(eventName, { detail: this.getValue() }))
  }

  private init(options: CurrencyInputOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    }
    if (this.options.autoDecimalDigits) {
      this.options.hideNegligibleDecimalDigitsOnFocus = false
      this.el.setAttribute('inputmode', 'numeric')
    } else {
      this.el.setAttribute('inputmode', 'decimal')
    }
    this.currencyFormat = new CurrencyFormat(this.options)
    this.numberMask = this.options.autoDecimalDigits ? new AutoDecimalDigitsInputMask(this.currencyFormat) : new DefaultInputMask(this.currencyFormat)
    const valueScalingOptions = {
      [ValueScaling.precision]: this.currencyFormat.maximumFractionDigits,
      [ValueScaling.thousands]: 3,
      [ValueScaling.millions]: 6,
      [ValueScaling.billions]: 9
    }
    this.valueScaling = this.options.valueScaling ? valueScalingOptions[this.options.valueScaling] : undefined
    this.valueScalingFractionDigits =
      this.valueScaling !== undefined && this.options.valueScaling !== ValueScaling.precision
        ? this.valueScaling + this.currencyFormat.maximumFractionDigits
        : this.currencyFormat.maximumFractionDigits
    this.minValue = this.getMinValue()
    this.maxValue = this.getMaxValue()
  }

  private getMinValue(): number {
    let min = this.toFloat(-Number.MAX_SAFE_INTEGER)
    if (this.options.valueRange?.min !== undefined) {
      min = Math.max(this.options.valueRange?.min, this.toFloat(-Number.MAX_SAFE_INTEGER))
    }
    return min
  }

  private getMaxValue(): number {
    let max = this.toFloat(Number.MAX_SAFE_INTEGER)
    if (this.options.valueRange?.max !== undefined) {
      max = Math.min(this.options.valueRange?.max, this.toFloat(Number.MAX_SAFE_INTEGER))
    }
    return max
  }

  private toFloat(value: number, maxFractionDigits?: number): number {
    return value / Math.pow(10, maxFractionDigits ?? this.valueScalingFractionDigits)
  }

  private toInteger(value: number, maxFractionDigits?: number) {
    return Number(
      value
        .toFixed(maxFractionDigits ?? this.valueScalingFractionDigits)
        .split('.')
        .join('')
    )
  }

  private validateValueRange(value: number | null): number | null {
    return value != null ? Math.min(Math.max(value, this.minValue), this.maxValue) : value
  }

  private applyFixedFractionFormat(number: number | null, forcedChange = false) {
    this.format(this.currencyFormat.format(this.validateValueRange(number)))
    if (number !== this.numberValue || forcedChange) {
      this.dispatchEvent('change')
    }
  }

  private format(value: string | null, hideNegligibleDecimalDigits = false) {
    if (value != null) {
      if (this.decimalSymbolInsertedAt !== undefined) {
        value = this.currencyFormat.normalizeDecimalSeparator(value, this.decimalSymbolInsertedAt)
        this.decimalSymbolInsertedAt = undefined
      }
      const conformedValue = this.numberMask.conformToMask(value, this.formattedValue)
      let formattedValue
      if (typeof conformedValue === 'object') {
        const { numberValue, fractionDigits } = conformedValue
        let { maximumFractionDigits, minimumFractionDigits } = this.currencyFormat
        if (this.focus) {
          minimumFractionDigits = hideNegligibleDecimalDigits
            ? fractionDigits.replace(/0+$/, '').length
            : Math.min(maximumFractionDigits, fractionDigits.length)
        } else if (Number.isInteger(numberValue) && !this.options.autoDecimalDigits && (this.options.precision === undefined || minimumFractionDigits === 0)) {
          minimumFractionDigits = maximumFractionDigits = 0
        }
        formattedValue =
          this.toInteger(Math.abs(numberValue)) > Number.MAX_SAFE_INTEGER
            ? this.formattedValue
            : this.currencyFormat.format(numberValue, {
                useGrouping: this.options.useGrouping && !(this.focus && this.options.hideGroupingSeparatorOnFocus),
                minimumFractionDigits,
                maximumFractionDigits
              })
      } else {
        formattedValue = conformedValue
      }
      if (this.maxValue <= 0 && !this.currencyFormat.isNegative(formattedValue) && this.currencyFormat.parse(formattedValue) !== 0) {
        formattedValue = formattedValue.replace(this.currencyFormat.prefix, this.currencyFormat.negativePrefix)
      }
      if (this.minValue >= 0) {
        formattedValue = formattedValue.replace(this.currencyFormat.negativePrefix, this.currencyFormat.prefix)
      }
      if (this.options.currencyDisplay === CurrencyDisplay.hidden || (this.focus && this.options.hideCurrencySymbolOnFocus)) {
        formattedValue = formattedValue
          .replace(this.currencyFormat.negativePrefix, this.currencyFormat.minusSign !== undefined ? this.currencyFormat.minusSign : '(')
          .replace(this.currencyFormat.negativeSuffix, this.currencyFormat.minusSign !== undefined ? '' : ')')
          .replace(this.currencyFormat.prefix, '')
          .replace(this.currencyFormat.suffix, '')
      }

      this.el.value = formattedValue
      this.numberValue = this.currencyFormat.parse(formattedValue)
    } else {
      this.el.value = ''
      this.numberValue = null
    }
    this.formattedValue = this.el.value
    this.dispatchEvent('input')
  }

  private addEventListener(): void {
    this.el.addEventListener(
      'input',
      (e: Event) => {
        if (!(e as CustomEvent).detail) {
          const { value, selectionStart } = this.el
          const inputEvent = e as InputEvent
          if (selectionStart && inputEvent.data && DECIMAL_SEPARATORS.includes(inputEvent.data)) {
            this.decimalSymbolInsertedAt = selectionStart - 1
          }
          this.format(value)
          if (this.focus && selectionStart != null) {
            const getCaretPositionAfterFormat = () => {
              const { prefix, suffix, decimalSymbol, maximumFractionDigits, groupingSymbol } = this.currencyFormat

              let caretPositionFromLeft = value.length - selectionStart
              const newValueLength = this.formattedValue.length

              if (this.currencyFormat.minusSign === undefined && (value.startsWith('(') || value.startsWith('-')) && !value.endsWith(')')) {
                return newValueLength - this.currencyFormat.negativeSuffix.length > 1 ? this.formattedValue.substring(selectionStart).length : 1
              }

              if (
                this.formattedValue.substr(selectionStart, 1) === groupingSymbol &&
                count(this.formattedValue, groupingSymbol) === count(value, groupingSymbol) + 1
              ) {
                return newValueLength - caretPositionFromLeft - 1
              }

              if (newValueLength < caretPositionFromLeft) {
                return selectionStart
              }

              if (decimalSymbol !== undefined && value.indexOf(decimalSymbol) !== -1) {
                const decimalSymbolPosition = value.indexOf(decimalSymbol) + 1
                if (Math.abs(newValueLength - value.length) > 1 && selectionStart <= decimalSymbolPosition) {
                  return this.formattedValue.indexOf(decimalSymbol) + 1
                } else {
                  if (!this.options.autoDecimalDigits && selectionStart > decimalSymbolPosition) {
                    if (this.currencyFormat.onlyDigits(value.substr(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
                      caretPositionFromLeft -= 1
                    }
                  }
                }
              }

              return this.options.hideCurrencySymbolOnFocus || this.options.currencyDisplay === CurrencyDisplay.hidden
                ? newValueLength - caretPositionFromLeft
                : Math.max(newValueLength - Math.max(caretPositionFromLeft, suffix.length), prefix.length)
            }
            this.setCaretPosition(getCaretPositionAfterFormat())
          }
        }
      },
      { capture: true }
    )

    this.el.addEventListener('focus', () => {
      this.focus = true
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = this.el
        this.format(value, this.options.hideNegligibleDecimalDigitsOnFocus)
        if (selectionStart != null && selectionEnd != null && Math.abs(selectionStart - selectionEnd) > 0) {
          this.setCaretPosition(0, this.el.value.length)
        } else if (selectionStart != null) {
          const caretPositionOnFocus = this.getCaretPositionOnFocus(value, selectionStart)
          this.setCaretPosition(caretPositionOnFocus)
        }
      })
    })

    this.el.addEventListener('blur', () => {
      this.focus = false
      this.applyFixedFractionFormat(this.numberValue)
    })

    this.el.addEventListener(
      'change',
      (e: Event) => {
        if (!(e as CustomEvent).detail) {
          this.dispatchEvent('change')
        }
      },
      { capture: true }
    )
  }

  private getCaretPositionOnFocus(value: string, selectionStart: number) {
    if (this.numberValue == null) {
      return selectionStart
    }
    const { prefix, negativePrefix, suffix, negativeSuffix, groupingSymbol, currency } = this.currencyFormat
    const isNegative = this.numberValue < 0
    const currentPrefix = isNegative ? negativePrefix : prefix
    const prefixLength = currentPrefix.length
    if (this.options.hideCurrencySymbolOnFocus || this.options.currencyDisplay === CurrencyDisplay.hidden) {
      if (isNegative) {
        if (selectionStart <= 1) {
          return 1
        } else if (value.endsWith(')') && selectionStart > value.indexOf(')')) {
          return this.formattedValue.length - 1
        }
      }
    } else {
      const suffixLength = isNegative ? negativeSuffix.length : suffix.length
      if (selectionStart >= value.length - suffixLength) {
        return this.formattedValue.length - suffixLength
      } else if (selectionStart < prefixLength) {
        return prefixLength
      }
    }
    let result = selectionStart
    if (
      this.options.hideCurrencySymbolOnFocus &&
      this.options.currencyDisplay !== CurrencyDisplay.hidden &&
      selectionStart >= prefixLength &&
      currency !== undefined &&
      currentPrefix.includes(currency)
    ) {
      result -= prefixLength
      if (isNegative) {
        result += 1
      }
    }
    if (this.options.hideGroupingSeparatorOnFocus && groupingSymbol !== undefined) {
      result -= count(value.substring(0, selectionStart), groupingSymbol)
    }
    return result
  }

  private setCaretPosition(start: number, end = start) {
    this.el.setSelectionRange(start, end)
  }
}
