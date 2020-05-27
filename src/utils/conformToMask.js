import {
  endsWith,
  escapeRegExp,
  insertCurrencySymbol,
  isNegative,
  normalizeDigits,
  onlyDigits,
  onlyLocaleDigits,
  removeLeadingZeros,
  startsWith,
  stripCurrencySymbol,
  stripMinusSymbol
} from './stringUtils'

const isValidInteger = (integer, groupingSymbol) => integer.match(new RegExp(`^(0|[1-9]\\d{0,2}(${escapeRegExp(groupingSymbol)}?\\d{3})*)$`))

const isFractionIncomplete = (value, { digits, decimalSymbol, groupingSymbol }) => {
  const numberParts = value.split(decimalSymbol)
  return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(normalizeDigits(numberParts[0], digits), groupingSymbol)
}

const checkIncompleteValue = (value, negative, previousConformedValue, currencyFormat) => {
  let { digits, negativePrefix, minusSymbol, decimalSymbol, maximumFractionDigits } = currencyFormat
  if (value === '' && negative && (previousConformedValue !== negativePrefix || previousConformedValue !== minusSymbol)) {
    return ''
  } else if (maximumFractionDigits > 0) {
    if (isFractionIncomplete(value, currencyFormat)) {
      return value
    } else if (startsWith(value, decimalSymbol)) {
      return `${digits[0]}${decimalSymbol}${(onlyLocaleDigits(value.substr(1), digits).substr(0, maximumFractionDigits))}`
    }
  }
  return null
}

const getAutoDecimalModeConformedValue = (str, { minimumFractionDigits, digits }, negative, allowNegative) => {
  if (str === '') {
    if (negative) {
      return {
        numberValue: allowNegative ? -0 : 0,
        fractionDigits: Number(-0).toFixed(minimumFractionDigits).slice(-minimumFractionDigits)
      }
    } else {
      return ''
    }
  } else {
    const numberValue = Number(`${negative && allowNegative ? '-' : ''}${removeLeadingZeros(onlyDigits(normalizeDigits(str, digits)))}`) / Math.pow(10, minimumFractionDigits)
    return {
      numberValue,
      fractionDigits: numberValue.toFixed(minimumFractionDigits).slice(-minimumFractionDigits)
    }
  }
}

export default (str, currencyFormat, previousConformedValue = '', autoDecimalMode, allowNegative) => {
  if (typeof str === 'string') {
    let negative = isNegative(str, currencyFormat)
    let value = stripCurrencySymbol(str, currencyFormat)
    value = stripMinusSymbol(value, currencyFormat.minusSymbol)

    if (currencyFormat.minimumFractionDigits > 0 && autoDecimalMode) {
      return getAutoDecimalModeConformedValue(value, currencyFormat, negative, allowNegative)
    }

    negative = negative && allowNegative
    const incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, currencyFormat)
    if (incompleteValue != null) {
      return insertCurrencySymbol(incompleteValue, currencyFormat, negative)
    }

    value = normalizeDigits(value, currencyFormat.digits)
    const [integer, ...fraction] = value.split(currencyFormat.decimalSymbol)
    const integerDigits = removeLeadingZeros(onlyDigits(integer))
    const fractionDigits = onlyDigits(fraction.join('')).substr(0, currencyFormat.maximumFractionDigits)
    const invalidFraction = fraction.length > 0 && fractionDigits.length === 0
    const invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== currencyFormat.negativePrefix)

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
  return previousConformedValue
}
