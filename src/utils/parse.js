import { isNumber, stripCurrencySymbolAndMinusSign } from './formatHelper'

export default (str, { prefix, suffix, groupingSymbol, decimalSymbol } = {}) => {
  if (typeof str === 'number') {
    return str
  } else if (str && typeof str === 'string') {
    if (isNumber(str)) {
      return Number(str)
    }
    let { value, negative } = stripCurrencySymbolAndMinusSign(str, { prefix, suffix })
    const numberParts = value.split(decimalSymbol)
    if (numberParts.length > 2) {
      return null
    }
    const integer = numberParts[0].replace(new RegExp(`\\${groupingSymbol}`, 'g'), '')
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
      return Number(number)
    }
  }
  return null
}
