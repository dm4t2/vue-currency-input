import { endsWith, isNumber, onlyDigits, removeLeadingZeros, startsWith, stripCurrencySymbolAndMinusSign } from './formatHelper'

const isValidInteger = (integer, groupingSymbol) => integer.match(new RegExp(`^-?(0|[1-9]\\d{0,2}(\\${groupingSymbol}?\\d{3})*)$`))

const isFractionIncomplete = (value, { decimalSymbol, groupingSymbol }) => {
  const numberParts = value.split(decimalSymbol)
  return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(numberParts[0], groupingSymbol)
}

const checkIncompleteValue = (value, negative, previousConformedValue, currencyFormat) => {
  const { prefix, negativePrefix, suffix, decimalSymbol, decimalLength } = currencyFormat
  if (value === '' && negative && previousConformedValue !== negativePrefix) {
    return `${negativePrefix}${suffix}`
  } else if (decimalLength > 0) {
    if (isFractionIncomplete(value, currencyFormat)) {
      return `${negative ? negativePrefix : prefix}${value}${suffix}`
    } else if (startsWith(value, decimalSymbol)) {
      return `${negative ? negativePrefix : prefix}0${decimalSymbol}${(onlyDigits(value.substr(1)).substr(0, decimalLength))}${suffix}`
    }
  }
  return null
}

const getAutoDecimalModeConformedValue = (value, previousConformedValue, { decimalLength }) => {
  if (value === '') {
    return { conformedValue: '' }
  } else {
    const negative = startsWith(value, '-')
    const conformedValue = value === '-' ? Number(-0) : Number(`${negative ? '-' : ''}${removeLeadingZeros(onlyDigits(value))}`) / Math.pow(10, decimalLength)
    return {
      conformedValue,
      fractionDigits: conformedValue.toFixed(decimalLength).slice(-decimalLength)
    }
  }
}

const isFractionInvalid = (fraction, numberOfFractionDigits) => fraction.length > 0 && numberOfFractionDigits === 0

const checkNumberValue = (value, { decimalLength }) => {
  if (isNumber(value)) {
    let [integer, fraction] = value.split('.')
    if (fraction) {
      fraction = fraction.substr(0, decimalLength)
    }
    return {
      conformedValue: Number(`${integer}.${fraction || ''}`),
      fractionDigits: fraction || ''
    }
  }
  return null
}

export default (str, currencyFormat, autoDecimalMode, previousConformedValue = '') => {
  if (typeof str === 'string') {
    str = str.trim()

    if (autoDecimalMode) {
      return getAutoDecimalModeConformedValue(str, previousConformedValue, currencyFormat)
    }

    const numberValue = checkNumberValue(str, currencyFormat)
    if (numberValue != null) {
      return numberValue
    }

    const { value, negative } = stripCurrencySymbolAndMinusSign(str, currencyFormat)
    const incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, currencyFormat)
    if (incompleteValue != null) {
      return { conformedValue: incompleteValue }
    }

    const [integer, ...fraction] = value.split(currencyFormat.decimalSymbol)
    const integerDigits = removeLeadingZeros(onlyDigits(integer))
    const fractionDigits = onlyDigits(fraction.join('')).substr(0, currencyFormat.decimalLength)

    if (isFractionInvalid(fraction, fractionDigits.length)) {
      return { conformedValue: previousConformedValue }
    }

    let number = integerDigits
    if (negative) {
      number = `-${number}`
    }
    if (fractionDigits.length > 0) {
      number += `.${fractionDigits}`
    }
    if (isNumber(number)) {
      return {
        conformedValue: Number(number),
        fractionDigits
      }
    } else if (number === '-' && previousConformedValue !== currencyFormat.negativePrefix) {
      return { conformedValue: previousConformedValue }
    } else {
      return { conformedValue: '' }
    }
  }
  return { conformedValue: previousConformedValue }
}
