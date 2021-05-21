import { removeLeadingZeros } from './utils'
import CurrencyFormat from './currencyFormat'

abstract class AbstractInputMask {
  protected currencyFormat: CurrencyFormat

  constructor(currencyFormat: CurrencyFormat) {
    this.currencyFormat = currencyFormat
  }
}

export interface InputMask {
  conformToMask(str: string, previousConformedValue: string): string | { fractionDigits: string; numberValue: number }
}

export class DefaultInputMask extends AbstractInputMask implements InputMask {
  conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: number } {
    const negative = this.currencyFormat.isNegative(str)
    const checkIncompleteValue = (str: string) => {
      if (str === '' && negative && previousConformedValue !== this.currencyFormat.negativePrefix) {
        return ''
      } else if (this.currencyFormat.maximumFractionDigits > 0) {
        if (this.currencyFormat.isFractionIncomplete(str)) {
          return str
        } else if (str.startsWith(this.currencyFormat.decimalSymbol as string)) {
          return this.currencyFormat.toFraction(str)
        }
      }
      return null
    }

    let value = str
    value = this.currencyFormat.stripCurrencySymbol(value)
    value = this.currencyFormat.stripMinusSymbol(value)

    const incompleteValue = checkIncompleteValue(value)
    if (incompleteValue != null) {
      return this.currencyFormat.insertCurrencySymbol(incompleteValue, negative)
    }

    const [integer, ...fraction] = value.split(this.currencyFormat.decimalSymbol as string)
    const integerDigits = removeLeadingZeros(this.currencyFormat.onlyDigits(integer))
    const fractionDigits = this.currencyFormat.onlyDigits(fraction.join('')).substr(0, this.currencyFormat.maximumFractionDigits)
    const invalidFraction = fraction.length > 0 && fractionDigits.length === 0
    const invalidNegativeValue =
      integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== this.currencyFormat.negativePrefix)

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

export class AutoDecimalDigitsInputMask extends AbstractInputMask implements InputMask {
  conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: number } {
    if (
      str === '' ||
      (this.currencyFormat.parse(previousConformedValue) === 0 &&
        this.currencyFormat.stripCurrencySymbol(previousConformedValue).slice(0, -1) === this.currencyFormat.stripCurrencySymbol(str))
    ) {
      return ''
    }
    const negative = this.currencyFormat.isNegative(str)
    const numberValue =
      this.currencyFormat.stripMinusSymbol(str) === ''
        ? -0
        : Number(`${negative ? '-' : ''}${removeLeadingZeros(this.currencyFormat.onlyDigits(str))}`) / Math.pow(10, this.currencyFormat.minimumFractionDigits)
    return {
      numberValue,
      fractionDigits: numberValue.toFixed(this.currencyFormat.minimumFractionDigits).slice(-this.currencyFormat.minimumFractionDigits)
    }
  }
}
