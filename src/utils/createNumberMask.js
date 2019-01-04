const nonDigitsRegExp = /\D+/g
const digitRegExp = /\d/
const caretTrap = '[]'

const convertToMask = strNumber => strNumber.split('').map((char) => digitRegExp.test(char) ? digitRegExp : char)

const createNumberMask = (
  {
    prefix = '',
    suffix = '',
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = ',',
    allowDecimal = true,
    allowNegative = false,
    decimalSymbol = '.',
    decimalLimit = 2,
    integerLimit = null
  } = {}) => {
  const prefixLength = prefix ? prefix.length : 0
  const suffixLength = suffix ? suffix.length : 0
  const thousandsSeparatorSymbolLength = thousandsSeparatorSymbol ? thousandsSeparatorSymbol.length : 0

  return (rawValue = '') => {
    const rawValueLength = rawValue.length
    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol)
    const hasDecimal = indexOfLastDecimal !== -1
    const isNegative = (rawValue[0] === '-') && allowNegative

    let integer, fraction, mask

    if (isNegative) {
      rawValue = rawValue.toString().substr(1)
    }

    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1)
    }

    if (hasDecimal && allowDecimal) {
      integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal)
      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength)
      fraction = convertToMask(fraction.replace(nonDigitsRegExp, ''))
    } else {
      if (rawValue.slice(0, prefixLength) === prefix) {
        integer = rawValue.slice(prefixLength)
      } else {
        integer = rawValue
      }
    }

    if (integerLimit && typeof integerLimit === 'number') {
      const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`
      const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length

      integer = integer.slice(0, integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength))
    }

    integer = integer.replace(nonDigitsRegExp, '')
    integer = integer.replace(/^0+(0$|[^0])/, '$1')

    integer = (includeThousandsSeparator) ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol) : integer

    mask = convertToMask(integer)

    if (hasDecimal && allowDecimal) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
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

    if (isNegative) {
      mask = [/-/].concat(mask)
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(''))
    }

    return mask
  }
}

export default createNumberMask
