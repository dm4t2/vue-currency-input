import { endsWith, isNumber, onlyDigits, removeCurrencySymbol, removePrefix, startsWith } from './formatHelper'

const isValidInteger = (integer, { prefix, thousandsSeparatorSymbol }) => integer.replace(prefix, '').match(new RegExp(`^-?(0|[1-9]\\d{0,2}(\\${thousandsSeparatorSymbol}?\\d{3})*)$`))

const isFractionIncomplete = (value, currencyFormat) => {
  const { prefix, decimalSymbol, thousandsSeparatorSymbol } = currencyFormat
  const numberParts = value.split(decimalSymbol)
  return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(numberParts[0], { prefix, thousandsSeparatorSymbol })
}

const checkIncompleteValue = (value, previousConformedValue, currencyFormat) => {
  const { prefix, suffix, decimalSymbol, decimalLength } = currencyFormat
  const negative = startsWith(value, '-')
  value = removePrefix(value, '-')
  value = removeCurrencySymbol(value, currencyFormat)
  if (value === '' && negative && previousConformedValue !== `-${prefix}`) {
    return `-${prefix}${suffix}`
  } else if (decimalLength > 0) {
    if (isFractionIncomplete(value, currencyFormat)) {
      return `${negative ? '-' : ''}${prefix}${value}${suffix}`
    } else if (startsWith(value, decimalSymbol)) {
      return `${negative ? '-' : ''}${prefix}0${decimalSymbol}${(onlyDigits(value.substr(1)).substr(0, decimalLength))}${suffix}`
    }
  }
  return null
}

const isFractionInvalid = (fraction, numberOfFractionDigits) => fraction.length > 0 && numberOfFractionDigits === 0

const checkNumberValue = (value, currencyFormat) => {
  if (isNumber(value)) {
    let [integer, fraction] = value.split('.')
    if (fraction) {
      fraction = fraction.substr(0, currencyFormat.decimalLength)
    }
    return {
      conformedValue: Number(`${integer}.${fraction || ''}`),
      fractionDigits: fraction || ''
    }
  }
  return null
}

export default (value, currencyFormat, previousConformedValue = '') => {
  if (typeof value === 'string') {
    value = value.trim()

    const numberValue = checkNumberValue(value, currencyFormat)
    if (numberValue != null) {
      return numberValue
    }

    const incompleteValue = checkIncompleteValue(value, previousConformedValue, currencyFormat)
    if (incompleteValue != null) {
      return { conformedValue: incompleteValue }
    }

    const [integer, ...fraction] = value.split(currencyFormat.decimalSymbol)
    const integerDigits = onlyDigits(integer).replace(/^0+(0$|[^0])/, '$1')
    const fractionDigits = onlyDigits(fraction.join('')).substr(0, currencyFormat.decimalLength)

    if (isFractionInvalid(fraction, fractionDigits.length)) {
      return { conformedValue: previousConformedValue }
    }

    let number = integerDigits
    if (startsWith(value, '-')) {
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
    } else if (number === '-' && previousConformedValue !== `-${currencyFormat.prefix}`) {
      return { conformedValue: previousConformedValue }
    } else {
      return { conformedValue: '' }
    }
  }
  return { conformedValue: previousConformedValue }
}
