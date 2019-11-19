import { isNumber, stripCurrencySymbolAndMinusSign } from './formatHelper'

export const getNumber = (number, valueAsInteger, decimalLength) => {
  return number != null && valueAsInteger ? Number(number.toFixed(decimalLength).split('.').join('')) : number
}

export default (str, currencyFormat, valueAsInteger = false) => {
  if (typeof str === 'string') {
    if (isNumber(str)) {
      return getNumber(Number(str), valueAsInteger, currencyFormat.decimalLength)
    }
    let { value, negative } = stripCurrencySymbolAndMinusSign(str, currencyFormat)
    const numberParts = value.split(currencyFormat.decimalSymbol)
    if (numberParts.length > 2) {
      return null
    }
    const integer = numberParts[0].replace(new RegExp(`\\${currencyFormat.groupingSymbol}`, 'g'), '')
    if (integer.length && !integer.match(/^\d+$/g)) {
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
    if (number) {
      if (negative) {
        number = `-${number}`
      }
      return getNumber(Number(number), valueAsInteger, currencyFormat.decimalLength)
    }
  }
  return null
}
