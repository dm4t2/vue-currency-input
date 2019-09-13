export const removeLeadingZeros = (str) => str.replace(/^0+(0$|[^0])/, '$1')

export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const count = (str, search) => (str.match(new RegExp(`\\${search}`, 'g')) || []).length

export const endsWith = (str, search) => {
  return str.substring(str.length - search.length, str.length) === search
}

export const startsWith = (str, search) => {
  return str.substring(0, search.length) === search
}

export const removePrefix = (str, prefix) => {
  if (prefix && startsWith(str, prefix)) {
    return str.substr(prefix.length)
  }
  return str
}

export const removeSuffix = (str, suffix) => {
  if (suffix && endsWith(str, suffix)) {
    return str.slice(0, suffix.length * -1)
  }
  return str
}

export const stripCurrencySymbolAndMinusSign = (str, { prefix, suffix }) => {
  const value = str.replace(prefix, '').replace(suffix, '')
  return {
    value: removePrefix(value, '-'),
    negative: startsWith(value, '-')
  }
}

export const isNumber = (str) => str.match(/^-?\d+(\.\d+)?$/)

export const parse = (str, { prefix, suffix, groupingSymbol, decimalSymbol } = {}) => {
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
