import { endsWith, isNumber, onlyDigits, removeLeadingZeros, startsWith, stripCurrencySymbolAndMinusSign } from './formatHelper'

const isValidInteger = (integer, groupingSymbol) => integer.match(new RegExp(`^-?(0|[1-9]\\d{0,2}(\\${groupingSymbol}?\\d{3})*)$`))

const isFractionIncomplete = (value, { decimalSymbol, groupingSymbol }) => {
  const numberParts = value.split(decimalSymbol)
  return endsWith(value, decimalSymbol) && numberParts.length === 2 && isValidInteger(numberParts[0], groupingSymbol)
}

const checkIncompleteValue = (value, negative, previousConformedValue, formatConfig) => {
  const { prefix, negativePrefix, suffix, decimalSymbol, decimalLength } = formatConfig
  if (value === '' && negative && previousConformedValue !== negativePrefix) {
    return `${negativePrefix}${suffix}`
  } else if (decimalLength > 0) {
    if (isFractionIncomplete(value, formatConfig)) {
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

export default (str, formatConfig, options, previousConformedValue = '') => {
  if (typeof str === 'string') {
    str = str.trim()

    if (options.autoDecimalMode) {
      return getAutoDecimalModeConformedValue(str, previousConformedValue, formatConfig)
    }

    const { value, negative } = stripCurrencySymbolAndMinusSign(str, formatConfig)
    const incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, formatConfig)
    if (incompleteValue != null) {
      return { conformedValue: incompleteValue }
    }

    const [integer, ...fraction] = value.split(formatConfig.decimalSymbol)
    const integerDigits = removeLeadingZeros(onlyDigits(integer))
    const fractionDigits = onlyDigits(fraction.join('')).substr(0, formatConfig.decimalLength)

    if (isFractionInvalid(fraction, fractionDigits.length)) {
      return { conformedValue: previousConformedValue }
    }

    let number = integerDigits
    if (negative) {
      number = `-${number}`
    }
    if (isNumber(number)) {
      return {
        conformedValue: Number(`${number}.${fractionDigits}`),
        fractionDigits
      }
    } else if (number === '-' && previousConformedValue !== formatConfig.negativePrefix) {
      return { conformedValue: previousConformedValue }
    } else {
      return { conformedValue: '' }
    }
  }
  return { conformedValue: previousConformedValue }
}
