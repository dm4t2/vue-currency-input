import { toInteger } from './numberUtils'
import { isNumber, normalizeDigits, normalizeMinusSymbol, stripCurrencySymbol } from './stringUtils'

export default (str, currencyFormat, valueAsInteger = false) => {
  if (typeof str === 'string') {
    str = normalizeDigits(str, currencyFormat.digits)
    let value = stripCurrencySymbol(str, currencyFormat)
    const numberParts = value.split(currencyFormat.decimalSymbol)
    if (numberParts.length > 2) {
      return null
    }
    const integer = numberParts[0].replace(new RegExp(`\\${currencyFormat.groupingSymbol}`, 'g'), '')
    if (!isNumber(integer)) {
      return null
    }
    let number = integer
    if (numberParts.length === 2) {
      const fraction = numberParts[1]
      if (fraction.length && !fraction.match(/^\d+$/g)) {
        return null
      }
      number += `.${fraction}`
    }
    return toInteger(Number(normalizeMinusSymbol(number)), valueAsInteger, currencyFormat.minimumFractionDigits)
  }
  return null
}
