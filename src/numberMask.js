import { removeLeadingZeros, startsWith } from './utils/stringUtils'

export class DefaultNumberMask {
  constructor (numberFormat) {
    this.numberFormat = numberFormat
  }

  conformToMask (str, previousConformedValue = '') {
    const negative = this.numberFormat.isNegative(str)
    const checkIncompleteValue = (str) => {
      if (str === '' && negative && previousConformedValue !== this.numberFormat.negativePrefix) {
        return ''
      } else if (this.numberFormat.maximumFractionDigits > 0) {
        if (this.numberFormat.isFractionIncomplete(str)) {
          return str
        } else if (startsWith(str, this.numberFormat.decimalSymbol)) {
          return this.numberFormat.toFraction(str)
        }
      }
      return null
    }

    let value = str
    value = this.numberFormat.stripCurrencySymbol(value)
    value = this.numberFormat.stripMinusSymbol(value)

    const incompleteValue = checkIncompleteValue(value)
    if (incompleteValue != null) {
      return this.numberFormat.insertCurrencySymbol(incompleteValue, negative)
    }

    const [integer, ...fraction] = value.split(this.numberFormat.decimalSymbol)
    const integerDigits = removeLeadingZeros(this.numberFormat.onlyDigits(integer))
    const fractionDigits = this.numberFormat.onlyDigits(fraction.join('')).substr(0, this.numberFormat.maximumFractionDigits)
    const invalidFraction = fraction.length > 0 && fractionDigits.length === 0
    const invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== this.numberFormat.negativePrefix)

    if (invalidFraction || invalidNegativeValue) {
      return previousConformedValue
    } else if (integerDigits.match(/\d+/)) {
      return {
        numberValue: Number(`${negative ? '-' : ''}${integerDigits}.${fractionDigits}`),
        fractionDigits
      }
    } else {
      return ''
    }
  }
}

export class AutoDecimalModeNumberMask {
  constructor (numberFormat) {
    this.numberFormat = numberFormat
  }

  conformToMask (str) {
    if (str === '') {
      return ''
    }
    const negative = this.numberFormat.isNegative(str)
    const numberValue = this.numberFormat.stripMinusSymbol(str) === ''
      ? -0
      : Number(`${negative ? '-' : ''}${removeLeadingZeros(this.numberFormat.onlyDigits(str))}`) / Math.pow(10, this.numberFormat.minimumFractionDigits)
    return {
      numberValue,
      fractionDigits: numberValue.toFixed(this.numberFormat.minimumFractionDigits).slice(-this.numberFormat.minimumFractionDigits)
    }
  }
}
