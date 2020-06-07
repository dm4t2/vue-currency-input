import { removeLeadingZeros, startsWith } from './stringUtils'

const checkIncompleteValue = (str, negative, previousConformedValue, numberFormat) => {
  if (str === '' && negative && (previousConformedValue !== numberFormat.negativePrefix || previousConformedValue !== numberFormat.minusSymbol)) {
    return ''
  } else if (numberFormat.maximumFractionDigits > 0) {
    if (numberFormat.isFractionIncomplete(str)) {
      return str
    } else if (startsWith(str, numberFormat.decimalSymbol)) {
      return numberFormat.toFraction(str)
    }
  }
  return null
}

const getAutoDecimalModeConformedValue = (str, numberFormat, negative, allowNegative) => {
  if (str === '') {
    if (negative) {
      return {
        numberValue: allowNegative ? -0 : 0,
        fractionDigits: Number(-0).toFixed(numberFormat.minimumFractionDigits).slice(-numberFormat.minimumFractionDigits)
      }
    } else {
      return ''
    }
  } else {
    const numberValue = Number(`${negative && allowNegative ? '-' : ''}${removeLeadingZeros(numberFormat.onlyDigits(str))}`) / Math.pow(10, numberFormat.minimumFractionDigits)
    return {
      numberValue,
      fractionDigits: numberValue.toFixed(numberFormat.minimumFractionDigits).slice(-numberFormat.minimumFractionDigits)
    }
  }
}

export default (str, numberFormat, previousConformedValue = '', autoDecimalMode, allowNegative) => {
  let negative = numberFormat.isNegative(str)
  let value = numberFormat.stripCurrencySymbol(str)
  value = numberFormat.stripMinusSymbol(value)

  if (numberFormat.minimumFractionDigits > 0 && autoDecimalMode) {
    return getAutoDecimalModeConformedValue(value, numberFormat, negative, allowNegative)
  }

  negative = negative && allowNegative
  const incompleteValue = checkIncompleteValue(value, negative, previousConformedValue, numberFormat)
  if (incompleteValue != null) {
    return numberFormat.insertCurrencySymbol(incompleteValue, negative)
  }

  const [integer, ...fraction] = value.split(numberFormat.decimalSymbol)
  const integerDigits = removeLeadingZeros(numberFormat.onlyDigits(integer))
  const fractionDigits = numberFormat.onlyDigits(fraction.join('')).substr(0, numberFormat.maximumFractionDigits)
  const invalidFraction = fraction.length > 0 && fractionDigits.length === 0
  const invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== numberFormat.negativePrefix)

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
