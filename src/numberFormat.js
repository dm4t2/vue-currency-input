import { count, escapeRegExp, startsWith, substringBefore } from './utils/stringUtils'

export const DECIMAL_SYMBOLS = [',', '.', '٫']
export const INTEGER_PATTERN = '(0|[1-9]\\d*)'

export default class NumberFormat {
  constructor (options) {
    const { currency, locale, precision, autoDecimalMode, valueAsInteger } = options
    const numberFormat = new Intl.NumberFormat(locale, typeof currency === 'string' ? { currency, style: 'currency' } : { minimumFractionDigits: 1 })
    const ps = numberFormat.format(123456)

    this.locale = locale
    this.currency = currency
    this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => i.toLocaleString(locale))
    this.decimalSymbol = count(ps, this.digits[0]) ? ps.substr(ps.indexOf(this.digits[6]) + 1, 1) : undefined
    this.groupingSymbol = ps.substr(ps.indexOf(this.digits[3]) + 1, 1)
    this.minusSymbol = substringBefore(Number(-1).toLocaleString(locale), this.digits[1])

    if (this.decimalSymbol === undefined) {
      this.minimumFractionDigits = this.maximumFractionDigits = 0
    } else if (typeof precision === 'number') {
      this.minimumFractionDigits = this.maximumFractionDigits = precision
    } else if (typeof precision === 'object' && !autoDecimalMode && !valueAsInteger) {
      this.minimumFractionDigits = precision.min || 0
      this.maximumFractionDigits = precision.max !== undefined ? precision.max : 20
    } else if (typeof currency === 'string') {
      this.minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits
      this.maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits
    } else {
      this.minimumFractionDigits = this.maximumFractionDigits = 2
    }

    if (typeof currency === 'string') {
      this.prefix = substringBefore(ps, this.digits[1])
      this.negativePrefix = substringBefore(numberFormat.format(-1), this.digits[1])
      this.suffix = ps.substring(ps.lastIndexOf(this.decimalSymbol ? this.digits[0] : this.digits[6]) + 1)
    } else {
      this.prefix = (currency || {}).prefix || ''
      this.negativePrefix = `${this.minusSymbol}${this.prefix}`
      this.suffix = (currency || {}).suffix || ''
    }
  }

  parse (str, valueAsInteger = false) {
    if (str) {
      const negative = this.isNegative(str)
      str = this.normalizeDigits(str)
      str = this.stripCurrencySymbol(str)
      str = this.stripMinusSymbol(str)
      const fraction = this.decimalSymbol ? `(?:${escapeRegExp(this.decimalSymbol)}(\\d*))?` : ''
      const match = this.stripGroupingSymbol(str).match(new RegExp(`^${INTEGER_PATTERN}${fraction}$`))
      if (match && this.isValidIntegerFormat(str.split(this.decimalSymbol)[0], Number(match[1]))) {
        const number = Number(`${negative ? '-' : ''}${match[1]}.${(match[2] || '')}`)
        return valueAsInteger ? Number(number.toFixed(this.maximumFractionDigits).split('.').join('')) : number
      }
    }
    return null
  }

  isValidIntegerFormat (str, integerNumber) {
    const options = typeof this.currency === 'string'
      ? { style: 'currency', currency: this.currency, minimumFractionDigits: 0 }
      : {}
    return [
      this.stripCurrencySymbol(this.normalizeDigits(integerNumber.toLocaleString(this.locale, { ...options, useGrouping: true }))),
      this.stripCurrencySymbol(this.normalizeDigits(integerNumber.toLocaleString(this.locale, { ...options, useGrouping: false })))
    ].includes(str)
  }

  format (number, options = {
    minimumFractionDigits: this.minimumFractionDigits,
    maximumFractionDigits: this.maximumFractionDigits
  }) {
    if (typeof this.currency === 'string') {
      return number.toLocaleString(this.locale, {
        style: 'currency',
        currency: this.currency,
        ...options
      })
    } else {
      return this.insertCurrencySymbol(Math.abs(number).toLocaleString(this.locale, options), number < 0 || (number === 0 && (1 / number < 0)))
    }
  }

  toFraction (str) {
    return `${this.digits[0]}${this.decimalSymbol}${(this.onlyLocaleDigits(str.substr(1)).substr(0, this.maximumFractionDigits))}`
  }

  isFractionIncomplete (str) {
    return !!this.normalizeDigits(this.stripGroupingSymbol(str)).match(new RegExp(`^${INTEGER_PATTERN}${escapeRegExp(this.decimalSymbol)}$`))
  }

  isNegative (str) {
    return startsWith(str, this.negativePrefix) || startsWith(str.replace('-', this.minusSymbol), this.minusSymbol)
  }

  insertCurrencySymbol (str, negative) {
    return `${negative ? this.negativePrefix : this.prefix}${str}${this.suffix}`
  }

  stripGroupingSymbol (str) {
    return str.replace(new RegExp(escapeRegExp(this.groupingSymbol), 'g'), '')
  }

  stripMinusSymbol (str) {
    return str.replace('-', this.minusSymbol).replace(this.minusSymbol, '')
  }

  stripCurrencySymbol (str) {
    return str.replace(this.negativePrefix, '').replace(this.prefix, '').replace(this.suffix, '')
  }

  normalizeDecimalSymbol (str, from) {
    DECIMAL_SYMBOLS.forEach((s) => {
      str = str.substr(0, from) + str.substr(from).replace(s, this.decimalSymbol)
    })
    return str
  }

  normalizeDigits (str) {
    if (this.digits[0] !== '0') {
      this.digits.forEach((digit, index) => {
        str = str.replace(new RegExp(digit, 'g'), index)
      })
    }
    return str
  }

  onlyDigits (str) {
    return this.normalizeDigits(str).replace(/\D+/g, '')
  }

  onlyLocaleDigits (str) {
    return str.replace(new RegExp(`[^${this.digits.join('')}]*`, 'g'), '')
  }
}
