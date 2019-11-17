import { isNumber, stripCurrencySymbolAndMinusSign } from './formatHelper'

export default (str, currencyFormat, valueAsInteger = false) => {
  if (typeof str === 'string') {
    if (isNumber(str)) {
      let number = Number(str)
      if (valueAsInteger) {
        number /= Math.pow(10, currencyFormat.decimalLength)
      }
      return number
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
      number = Number(number)
      if (valueAsInteger) {
        number /= Math.pow(10, currencyFormat.decimalLength)
      }
      return Number(number)
    }
  }
  return null
}
