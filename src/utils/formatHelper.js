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
