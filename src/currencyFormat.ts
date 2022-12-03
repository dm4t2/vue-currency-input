import { escapeRegExp, substringBefore } from './utils'
import { CurrencyDisplay, CurrencyFormatOptions } from './api'

export const DECIMAL_SEPARATORS = [',', '.', '٫']
export const INTEGER_PATTERN = '(0|[1-9]\\d*)'

export default class CurrencyFormat {
  options: Intl.NumberFormatOptions
  locale?: string
  currency?: string
  digits: string[]
  decimalSymbol: string | undefined
  groupingSymbol: string | undefined
  minusSign: string | undefined
  minimumFractionDigits: number
  maximumFractionDigits: number
  prefix: string
  negativePrefix: string
  suffix: string
  negativeSuffix: string

  constructor(options: CurrencyFormatOptions) {
    const { currency, currencyDisplay, locale, precision, accountingSign, useGrouping } = options
    this.locale = locale
    this.options = {
      currency,
      useGrouping,
      style: 'currency',
      currencySign: accountingSign ? 'accounting' : undefined,
      currencyDisplay: currencyDisplay !== CurrencyDisplay.hidden ? currencyDisplay : undefined
    }
    const numberFormat = new Intl.NumberFormat(locale, this.options)
    const formatParts = numberFormat.formatToParts(123456)

    this.currency = formatParts.find(({ type }) => type === 'currency')?.value
    this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => i.toLocaleString(locale))
    this.decimalSymbol = formatParts.find(({ type }) => type === 'decimal')?.value
    this.groupingSymbol = formatParts.find(({ type }) => type === 'group')?.value
    this.minusSign = numberFormat.formatToParts(-1).find(({ type }) => type === 'minusSign')?.value

    if (this.decimalSymbol === undefined) {
      this.minimumFractionDigits = this.maximumFractionDigits = 0
    } else if (typeof precision === 'number') {
      this.minimumFractionDigits = this.maximumFractionDigits = precision
    } else {
      this.minimumFractionDigits = precision?.min ?? numberFormat.resolvedOptions().minimumFractionDigits
      this.maximumFractionDigits = precision?.max ?? numberFormat.resolvedOptions().maximumFractionDigits
    }

    const getPrefix = (str: string) => {
      return substringBefore(str, this.digits[1])
    }
    const getSuffix = (str: string) => {
      return str.substring(str.lastIndexOf(this.decimalSymbol ? this.digits[0] : this.digits[1]) + 1)
    }

    this.prefix = getPrefix(numberFormat.format(1))
    this.suffix = getSuffix(numberFormat.format(1))
    this.negativePrefix = getPrefix(numberFormat.format(-1))
    this.negativeSuffix = getSuffix(numberFormat.format(-1))
  }

  parse(str: string | null): number | null {
    if (str) {
      const negative = this.isNegative(str)
      str = this.normalizeDigits(str)
      str = this.stripCurrency(str, negative)
      str = this.stripSignLiterals(str)
      const fraction = this.decimalSymbol ? `(?:${escapeRegExp(this.decimalSymbol)}(\\d*))?` : ''
      const match = this.stripGroupingSeparator(str).match(new RegExp(`^${INTEGER_PATTERN}${fraction}$`))
      if (match && this.isValidIntegerFormat(this.decimalSymbol ? str.split(this.decimalSymbol)[0] : str, Number(match[1]))) {
        return Number(`${negative ? '-' : ''}${this.onlyDigits(match[1])}.${this.onlyDigits(match[2] || '')}`)
      }
    }
    return null
  }

  isValidIntegerFormat(formattedNumber: string, integerNumber: number): boolean {
    const options = { ...this.options, minimumFractionDigits: 0 }
    return [
      this.stripCurrency(this.normalizeDigits(integerNumber.toLocaleString(this.locale, { ...options, useGrouping: true })), false),
      this.stripCurrency(this.normalizeDigits(integerNumber.toLocaleString(this.locale, { ...options, useGrouping: false })), false)
    ].includes(formattedNumber)
  }

  format(
    value: number | null,
    options: Intl.NumberFormatOptions = {
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits
    }
  ): string {
    return value != null ? value.toLocaleString(this.locale, { ...this.options, ...options }) : ''
  }

  toFraction(str: string): string {
    return `${this.digits[0]}${this.decimalSymbol}${this.onlyLocaleDigits(str.substr(1)).substr(0, this.maximumFractionDigits)}`
  }

  isFractionIncomplete(str: string): boolean {
    return !!this.normalizeDigits(this.stripGroupingSeparator(str)).match(new RegExp(`^${INTEGER_PATTERN}${escapeRegExp(this.decimalSymbol as string)}$`))
  }

  isNegative(str: string): boolean {
    return (
      str.startsWith(this.negativePrefix) ||
      (this.minusSign === undefined && (str.startsWith('(') || str.startsWith('-'))) ||
      (this.minusSign !== undefined && str.replace('-', this.minusSign).startsWith(this.minusSign))
    )
  }

  insertCurrency(str: string, negative: boolean): string {
    return `${negative ? this.negativePrefix : this.prefix}${str}${negative ? this.negativeSuffix : this.suffix}`
  }

  stripGroupingSeparator(str: string): string {
    return this.groupingSymbol !== undefined ? str.replace(new RegExp(escapeRegExp(this.groupingSymbol), 'g'), '') : str
  }

  stripSignLiterals(str: string): string {
    if (this.minusSign !== undefined) {
      return str.replace('-', this.minusSign).replace(this.minusSign, '')
    } else {
      return str.replace(/[-()]/g, '')
    }
  }

  stripCurrency(str: string, negative: boolean): string {
    return str.replace(negative ? this.negativePrefix : this.prefix, '').replace(negative ? this.negativeSuffix : this.suffix, '')
  }

  normalizeDecimalSeparator(str: string, from: number): string {
    DECIMAL_SEPARATORS.forEach((s) => {
      str = str.substr(0, from) + str.substr(from).replace(s, this.decimalSymbol as string)
    })
    return str
  }

  normalizeDigits(str: string): string {
    if (this.digits[0] !== '0') {
      this.digits.forEach((digit, index) => {
        str = str.replace(new RegExp(digit, 'g'), String(index))
      })
    }
    return str
  }

  onlyDigits(str: string): string {
    return this.normalizeDigits(str).replace(/\D+/g, '')
  }

  onlyLocaleDigits(str: string): string {
    return str.replace(new RegExp(`[^${this.digits.join('')}]*`, 'g'), '')
  }
}
