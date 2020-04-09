export const removeLeadingZeros = (str) => str.replace(/^0+(0$|[^0])/, '$1')

export const onlyDigits = (str, digits) => normalizeDigits(str, digits).replace(/\D+/g, '')

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
    negativePrefix = currencyFormat.minusSymbol
  }
  return `${negative ? negativePrefix : prefix}${value}${suffix}`
}

export const stripCurrencySymbol = (str, { prefix, suffix }) => {
  if (prefix) {
    str = str.replace(prefix, '').replace(prefix.trim(), '')
  }
  if (suffix) {
    str = str.replace(suffix, '').replace(suffix.trim(), '')
  }
  return str.trim()
}

export const normalizeMinusSymbol = (str) => {
  return str.replace(new RegExp(`^${['−', '-', '‐'].join('|')}`, 'g'), '-')
}

export const isNegative = (str) => normalizeMinusSymbol(str).charAt(0) === '-'

export const isNumber = (str) => normalizeMinusSymbol(str).match(new RegExp(`^-?\\d+(\\.\\d+)?$`))

export const normalizeDigits = (str, digits) => {
  digits.forEach((digit, index) => {
    str = str.replace(new RegExp(digit, 'g'), index)
  })
  return str
}
