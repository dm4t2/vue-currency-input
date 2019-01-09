import { onlyDigits, removePrefix, removeSuffix } from './formatHelper'

const digitRegExp = /\d/
const caretTrap = '[]'

const convertToMask = (strNumber) => strNumber.split('').map((char) => digitRegExp.test(char) ? digitRegExp : char)

const createNumberMask = (
  {
    prefix = '',
    suffix = '',
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = ',',
    allowDecimal = true,
    allowNegative = true,
    decimalSymbol = '.',
    decimalLimit = 2,
    integerLimit = null
  } = {}) => {
  const prefixLength = prefix ? prefix.length : 0
  const suffixLength = suffix ? suffix.length : 0
  const thousandsSeparatorSymbolLength = thousandsSeparatorSymbol ? thousandsSeparatorSymbol.length : 0

  return (rawValue = '') => {
    if (rawValue === '' || (rawValue[0] === prefix[0] && rawValue.length === 1)) {
      return prefix.split('').concat([digitRegExp]).concat(suffix.split(''))
    } else if (rawValue === decimalSymbol && allowDecimal) {
      return prefix.split('').concat(['0', decimalSymbol, digitRegExp]).concat(suffix.split(''))
    }

    const indexOfDecimalSymbol = rawValue.indexOf(decimalSymbol)
    const hasDecimal = indexOfDecimalSymbol !== -1
    const negative = rawValue.startsWith('-') && allowNegative

    let integer, fraction

    rawValue = removePrefix(rawValue, '-')
    rawValue = removePrefix(rawValue, prefix)
    rawValue = removeSuffix(rawValue, suffix)

    if (hasDecimal && allowDecimal) {
      const numberParts = rawValue.split(decimalSymbol)
      integer = numberParts[0]
      fraction = convertToMask(onlyDigits(numberParts[1]))
    } else {
      integer = rawValue
    }

    if (integerLimit && typeof integerLimit === 'number') {
      const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`
      const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length
      integer = integer.slice(0, integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength))
    }

    integer = onlyDigits(integer)
    integer = integer.replace(/^0+(0$|[^0])/, '$1')
    integer = (includeThousandsSeparator) ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol) : integer

    let mask = convertToMask(integer)

    if (hasDecimal && allowDecimal) {
      if (rawValue[indexOfDecimalSymbol - 1] !== decimalSymbol) {
        mask.push(caretTrap)
      }
      mask.push(decimalSymbol, caretTrap)
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
      if (mask.length === prefixLength) {
        mask.push(digitRegExp)
      }
      mask = [/-/].concat(mask)
    }

    if (suffixLength > 0) {
      mask = mask.concat(suffix.split(''))
    }
    return mask
  }
}

export default createNumberMask
