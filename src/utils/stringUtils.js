export const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const removeLeadingZeros = (str) => str.replace(/^0+(0$|[^0])/, '$1')

export const onlyLocaleDigits = (str, digits) => str.replace(new RegExp(`[^${digits.join('')}]*`, 'g'), '')

export const onlyDigits = str => str.replace(/\D+/g, '')

export const count = (str, search) => (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length

export const endsWith = (str, search) => str.substring(str.length - search.length, str.length) === search

export const startsWith = (str, search) => str.substring(0, search.length) === search

export const insertCurrencySymbol = (value, { prefix, negativePrefix, suffix }, negative) => `${negative ? negativePrefix : prefix}${value}${suffix}`

export const stripMinusSymbol = (str, minusSymbol) => str.replace('-', minusSymbol).replace(minusSymbol, '')

export const stripCurrencySymbol = (str, { prefix, negativePrefix, suffix }) => str.replace(negativePrefix, '').replace(prefix, '').replace(suffix, '')

export const isNegative = (str, { minusSymbol, negativePrefix }) => startsWith(str, negativePrefix) || startsWith(str.replace('-', minusSymbol), minusSymbol)

export const normalizeDigits = (str, digits) => {
  digits.forEach((digit, index) => {
    str = str.replace(new RegExp(digit, 'g'), index)
  })
  return str
}
