import CurrencyFormat, { DECIMAL_SEPARATORS } from './currencyFormat'
import { AutoDecimalDigitsInputMask, DefaultInputMask, InputMask } from './inputMask'
import { count, bigIntToDecimalString, decimalStringToBigInt } from './utils'
import { CurrencyDisplay, CurrencyInputOptions } from './api'

const DEFAULT_OPTIONS: Omit<CurrencyInputOptions, 'currency'> = {
  locale: undefined,
  currencyDisplay: undefined,
  hideGroupingSeparatorOnFocus: true,
  hideCurrencySymbolOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  valueRange: undefined,
  useGrouping: true
}

interface CurrencyInputConstructorArgs {
  el: HTMLInputElement
  options: CurrencyInputOptions
  onInput?: (value: string | null) => void
  onChange?: (value: string | null) => void
}

export class CurrencyInput {
  private readonly el: HTMLInputElement
  private readonly onInput?: (value: string | null) => void
  private readonly onChange?: (value: string | null) => void
  private value!: bigint | null
  private valueOnFocus!: bigint | null
  private options!: CurrencyInputOptions
  private currencyFormat!: CurrencyFormat
  private decimalSymbolInsertedAt?: number
  private numberMask!: InputMask
  private formattedValue!: string
  private focus!: boolean
  private minValue?: bigint
  private maxValue?: bigint

  constructor(args: CurrencyInputConstructorArgs) {
    this.el = args.el
    this.addEventListener()
    this.init(args.options)
    this.onInput = args.onInput
    this.onChange = args.onChange
  }

  setOptions(options: CurrencyInputOptions): void {
    this.init(options)
    this.applyFixedFractionFormat(this.value, true)
  }

  setValue(value: string | number | null): void {
    const newValue = value != null ? decimalStringToBigInt(value.toString(), this.currencyFormat.maximumFractionDigits) : null
    if (newValue !== this.value) {
      this.applyFixedFractionFormat(newValue)
    }
  }

  getValue(): string | null {
    return bigIntToDecimalString(this.value, this.currencyFormat.maximumFractionDigits)
  }

  private init(options: CurrencyInputOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    }
    if (this.options.autoDecimalDigits) {
      this.options.hideNegligibleDecimalDigitsOnFocus = false
    }
    if (!this.el.getAttribute('inputmode')) {
      this.el.setAttribute('inputmode', this.options.autoDecimalDigits ? 'numeric' : 'decimal')
    }
    const maximumFractionDigits = this.currencyFormat?.maximumFractionDigits
    this.currencyFormat = new CurrencyFormat(this.options)
    if (this.value && maximumFractionDigits !== undefined) {
      const newMaximumFractionDigits = this.currencyFormat.maximumFractionDigits
      if (maximumFractionDigits < newMaximumFractionDigits) {
        this.value *= 10n ** BigInt(newMaximumFractionDigits - maximumFractionDigits)
      } else if (maximumFractionDigits > newMaximumFractionDigits) {
        this.value /= 10n ** BigInt(maximumFractionDigits - newMaximumFractionDigits)
      }
    }
    this.numberMask = this.options.autoDecimalDigits ? new AutoDecimalDigitsInputMask(this.currencyFormat) : new DefaultInputMask(this.currencyFormat)
    this.minValue = this.getMinValue()
    this.maxValue = this.getMaxValue()
  }

  private getMinValue() {
    const min = this.options.valueRange?.min
    return min !== undefined ? (decimalStringToBigInt(min.toString(), this.currencyFormat.maximumFractionDigits) ?? undefined) : min
  }

  private getMaxValue(): bigint | undefined {
    const max = this.options.valueRange?.max
    return max !== undefined ? (decimalStringToBigInt(max.toString(), this.currencyFormat.maximumFractionDigits) ?? undefined) : max
  }

  private validateValueRange(value: bigint | null): bigint | null {
    if (value != null) {
      if (this.minValue !== undefined && value < this.minValue) {
        value = this.minValue
      }
      if (this.maxValue !== undefined && value > this.maxValue) {
        value = this.maxValue
      }
    }
    return value
  }

  private applyFixedFractionFormat(number: bigint | null, forcedChange = false) {
    this.format(this.currencyFormat.format(this.validateValueRange(number)))
    if (number !== this.value || forcedChange) {
      this.onChange?.(this.getValue())
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
        } else if (
          numberValue % 10n ** BigInt(this.currencyFormat.maximumFractionDigits) === 0n &&
          !this.options.autoDecimalDigits &&
          (this.options.precision === undefined || minimumFractionDigits === 0)
        ) {
          minimumFractionDigits = maximumFractionDigits = 0
        }
        formattedValue = this.currencyFormat.format(numberValue, {
          useGrouping: this.options.useGrouping && !(this.focus && this.options.hideGroupingSeparatorOnFocus),
          minimumFractionDigits,
          maximumFractionDigits
        })
      } else {
        formattedValue = conformedValue
      }
      if (
        this.maxValue !== undefined &&
        this.maxValue <= 0 &&
        !this.currencyFormat.isNegative(formattedValue) &&
        this.currencyFormat.parse(formattedValue) !== BigInt(0)
      ) {
        formattedValue = formattedValue.replace(this.currencyFormat.prefix, this.currencyFormat.negativePrefix)
      }
      if (this.minValue !== undefined && this.minValue >= 0) {
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
      this.value = this.currencyFormat.parse(formattedValue)
    } else {
      this.el.value = ''
      this.value = null
    }
    this.formattedValue = this.el.value
    this.onInput?.(this.getValue())
  }

  private addEventListener(): void {
    this.el.addEventListener('input', (e: Event) => {
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
            this.formattedValue.substring(selectionStart, 1) === groupingSymbol &&
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
                if (this.currencyFormat.onlyDigits(value.substring(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
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
    })

    this.el.addEventListener('focus', () => {
      this.focus = true
      this.valueOnFocus = this.value
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
      this.format(this.currencyFormat.format(this.validateValueRange(this.value)))
      if (this.valueOnFocus !== this.value) {
        this.onChange?.(this.getValue())
      }
    })
  }

  private getCaretPositionOnFocus(value: string, selectionStart: number) {
    if (this.value == null) {
      return selectionStart
    }
    const { prefix, negativePrefix, suffix, negativeSuffix, groupingSymbol, currency } = this.currencyFormat
    const isNegative = this.value < 0
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
