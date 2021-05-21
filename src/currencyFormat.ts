import { count, escapeRegExp, substringBefore } from './utils'
import { CurrencyInputOptions } from './api'
import NumberFormatOptions = Intl.NumberFormatOptions

export const DECIMAL_SEPARATORS = [',', '.', '٫']
export const INTEGER_PATTERN = '(0|[1-9]\\d*)'

export default class CurrencyFormat {
  locale?: string
  currency: string
  digits: string[]
  decimalSymbol: string | undefined
  groupingSymbol: string
  minusSymbol: string
  minimumFractionDigits: number
  maximumFractionDigits: number
  prefix: string
  negativePrefix: string
  suffix: string

  constructor(options: CurrencyInputOptions) {
    const { currency, locale, precision } = options
    const numberFormat = new Intl.NumberFormat(locale, { currency, style: 'currency' })
    const ps = numberFormat.format(123456)

    this.locale = locale
    this.currency = currency
    this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => i.toLocaleString(locale))
    this.decimalSymbol = count(ps, this.digits[0]) ? ps.substr(ps.indexOf(this.digits[6]) + 1, 1) : undefined
    this.groupingSymbol = ps.substr(ps.indexOf(this.digits[3]) + 1, 1)
    this.minusSymbol = substringBefore(Number(-1).toLocaleString(locale), this.digits[1])

    if (this.decimalSymbol === undefined) {
      this.minimumFractionDigits = this.maximumFractionDigits = 0
    } else if (precision !== undefined) {
      this.minimumFractionDigits = this.maximumFractionDigits = precision
    } else {
      this.minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits
      this.maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits
    }

    this.prefix = substringBefore(ps, this.digits[1])
    this.negativePrefix = substringBefore(numberFormat.format(-1), this.digits[1])
    this.suffix = ps.substring(ps.lastIndexOf(this.decimalSymbol ? this.digits[0] : this.digits[6]) + 1)
  }

  parse(str: string | null): number | null {
    if (str) {
      const negative = this.isNegative(str)
      str = this.normalizeDigits(str)
      str = this.stripCurrencySymbol(str)
      str = this.stripMinusSymbol(str)
      const fraction = this.decimalSymbol ? `(?:${escapeRegExp(this.decimalSymbol)}(\\d*))?` : ''
      const match = this.stripGroupingSeparator(str).match(new RegExp(`^${INTEGER_PATTERN}${fraction}$`))
      if (match && this.isValidIntegerFormat(this.decimalSymbol ? str.split(this.decimalSymbol)[0] : str, Number(match[1]))) {
        return Number(`${negative ? '-' : ''}${this.onlyDigits(match[1])}.${this.onlyDigits(match[2] || '')}`)
      }
    }
    return null
  }

  isValidIntegerFormat(formattedNumber: string, integerNumber: number): boolean {
    const options = { style: 'currency', currency: this.currency, minimumFractionDigits: 0 }
    return [
      this.stripCurrencySymbol(
        this.normalizeDigits(
          integerNumber.toLocaleString(this.locale, {
            ...options,
            useGrouping: true
          })
        )
      ),
      this.stripCurrencySymbol(
        this.normalizeDigits(
          integerNumber.toLocaleString(this.locale, {
            ...options,
            useGrouping: false
          })
        )
      )
    ].includes(formattedNumber)
  }

  format(
    value: number | null,
    options: NumberFormatOptions = {
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits
    }
  ): string {
    return value != null
      ? value.toLocaleString(this.locale, {
          style: 'currency',
          currency: this.currency,
          ...options
        })
      : ''
  }

  toFraction(str: string): string {
    return `${this.digits[0]}${this.decimalSymbol}${this.onlyLocaleDigits(str.substr(1)).substr(0, this.maximumFractionDigits)}`
  }

  isFractionIncomplete(str: string): boolean {
    return !!this.normalizeDigits(this.stripGroupingSeparator(str)).match(new RegExp(`^${INTEGER_PATTERN}${escapeRegExp(this.decimalSymbol as string)}$`))
  }

  isNegative(str: string): boolean {
    return str.startsWith(this.negativePrefix) || str.replace('-', this.minusSymbol).startsWith(this.minusSymbol)
  }

  insertCurrencySymbol(str: string, negative: boolean): string {
    return `${negative ? this.negativePrefix : this.prefix}${str}${this.suffix}`
  }

  stripGroupingSeparator(str: string): string {
    return str.replace(new RegExp(escapeRegExp(this.groupingSymbol), 'g'), '')
  }

  stripMinusSymbol(str: string): string {
    return str.replace('-', this.minusSymbol).replace(this.minusSymbol, '')
  }

  stripCurrencySymbol(str: string): string {
    return str.replace(this.negativePrefix, '').replace(this.prefix, '').replace(this.suffix, '')
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
