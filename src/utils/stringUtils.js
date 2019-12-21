export const removeLeadingZeros = (str) => str.replace(/^0+(0$|[^0])/, '$1')

export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const count = (str, search) => (str.match(new RegExp(`\\${search}`, 'g')) || []).length

export const endsWith = (str, search) => {
  return str.substring(str.length - search.length, str.length) === search
}

export const startsWith = (str, search) => {
  return str.substring(0, search.length) === search
}

export const insertCurrencySymbol = (value, currencyFormat, negative, hideCurrencySymbol) => {
  let { prefix, negativePrefix, suffix } = currencyFormat
  if (hideCurrencySymbol) {
    prefix = suffix = ''
    negativePrefix = '-'
  }
  return `${negative ? negativePrefix : prefix}${value}${suffix}`
}

export const stripCurrencySymbolAndMinusSign = (str, { prefix, suffix }) => {
  const value = str.replace(prefix, '').replace(suffix, '')
  return {
    value: value.replace('-', ''),
    negative: startsWith(value, '-')
  }
}

export const isNumber = (str) => str.match(/^-?\d+(\.\d+)?$/)
