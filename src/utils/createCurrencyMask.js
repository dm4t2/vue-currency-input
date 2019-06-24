import { onlyDigits, removePrefix, removeSuffix, startsWith } from './formatHelper'

const digitRegExp = /\d/
const caretTrap = '[]'

const convertToMask = (strNumber) => strNumber.split('').map((char) => digitRegExp.test(char) ? digitRegExp : char)

export default ({ prefix, suffix, thousandsSeparatorSymbol, allowDecimal, allowNegative, decimalSymbol, decimalLimit } = {}) => {
  const prefixLength = prefix ? prefix.length : 0
  const suffixLength = suffix ? suffix.length : 0

  return (rawValue = '') => {
    const indexOfDecimalSymbol = rawValue.indexOf(decimalSymbol)
    const hasDecimal = indexOfDecimalSymbol !== -1
    const negative = startsWith(rawValue, '-') && allowNegative

    rawValue = removePrefix(rawValue, '-')
    rawValue = removePrefix(rawValue, prefix)
    rawValue = removeSuffix(rawValue, suffix)

    let integer, fraction

    if (hasDecimal && allowDecimal) {
      const numberParts = rawValue.split(decimalSymbol)
      integer = numberParts[0]
      fraction = convertToMask(onlyDigits(numberParts[1]))
    } else {
      integer = rawValue
    }

    integer = onlyDigits(integer)
    integer = integer.replace(/^0+(0$|[^0])/, '$1')
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)

    let mask = convertToMask(integer)

    if (hasDecimal && allowDecimal) {
      mask.push(caretTrap, decimalSymbol, caretTrap)
      if (fraction) {
        if (typeof decimalLimit === 'number') {
          fraction = fraction.slice(0, decimalLimit)
        }
        mask = mask.concat(fraction)
      }
    }
    if (prefixLength > 0) {
      mask = prefix.split('').concat(mask)
    }
    if (negative) {
      mask = [/-/].concat(mask)
    }
    if (suffixLength > 0) {
      mask = mask.concat(suffix.split(''))
    }
    return mask
  }
}
