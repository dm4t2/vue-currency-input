import { removeLeadingZeros } from './utils'
import CurrencyFormat from './currencyFormat'

abstract class AbstractInputMask {
  protected currencyFormat: CurrencyFormat

  constructor(currencyFormat: CurrencyFormat) {
    this.currencyFormat = currencyFormat
  }
}

export interface InputMask {
  conformToMask(str: string, previousConformedValue: string): string | { fractionDigits: string; numberValue: bigint }
}

export class DefaultInputMask extends AbstractInputMask implements InputMask {
  conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: bigint } {
    const negative = this.currencyFormat.isNegative(str)
    const isEmptyNegativeValue = (str: string) =>
      str === '' &&
      negative &&
      !(this.currencyFormat.minusSign === undefined
        ? previousConformedValue === this.currencyFormat.negativePrefix + this.currencyFormat.negativeSuffix
        : previousConformedValue === this.currencyFormat.negativePrefix)

    const checkIncompleteValue = (str: string) => {
      if (isEmptyNegativeValue(str)) {
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
    value = this.currencyFormat.stripCurrency(value, negative)
    value = this.currencyFormat.stripSignLiterals(value)

    const incompleteValue = checkIncompleteValue(value)
    if (incompleteValue != null) {
      return this.currencyFormat.insertCurrency(incompleteValue, negative)
    }

    const [integer, ...fraction] = value.split(this.currencyFormat.decimalSymbol as string)
    const integerDigits = removeLeadingZeros(this.currencyFormat.onlyDigits(integer))
    const fractionDigits = this.currencyFormat.onlyDigits(fraction.join('')).substring(0, this.currencyFormat.maximumFractionDigits)
    const invalidFraction = fraction.length > 0 && fractionDigits.length === 0

    const invalidNegativeValue =
      integerDigits === '' &&
      negative &&
      (this.currencyFormat.minusSign === undefined
        ? previousConformedValue === str.slice(0, -2) + this.currencyFormat.negativeSuffix
        : previousConformedValue === str.slice(0, -1))

    if (invalidFraction || invalidNegativeValue || isEmptyNegativeValue(integerDigits)) {
      return previousConformedValue
    } else if (integerDigits.match(/\d+/)) {
      return {
        numberValue: BigInt(`${negative ? '-' : ''}${integerDigits}${fractionDigits.padEnd(this.currencyFormat.maximumFractionDigits, '0')}`),
        fractionDigits
      }
    } else {
      return ''
    }
  }
}

export class AutoDecimalDigitsInputMask extends AbstractInputMask implements InputMask {
  conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: bigint } {
    const negative = this.currencyFormat.isNegative(str)
    if (
      str === '' ||
      (this.currencyFormat.parse(previousConformedValue) === 0n &&
        this.currencyFormat.stripCurrency(previousConformedValue, negative).slice(0, -1) === this.currencyFormat.stripCurrency(str, negative))
    ) {
      return ''
    }
    const numberValue =
      this.currencyFormat.stripSignLiterals(str) === '' ? -0n : BigInt(`${negative ? '-' : ''}${removeLeadingZeros(this.currencyFormat.onlyDigits(str))}`)
    return {
      numberValue,
      fractionDigits: numberValue.toString().slice(-this.currencyFormat.maximumFractionDigits).padStart(this.currencyFormat.maximumFractionDigits, '0')
    }
  }
}
