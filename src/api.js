import createCurrencyFormat from './utils/createCurrencyFormat'
import parse from './utils/parse'

/**
 * Parses a number from a currency formatted string.
 * @param {String} formattedValue The currency formatted string to be parsed, for example `$1,234.50`.
 * @param {String} locale A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`).
 * @param {String} currency A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`).
 * @returns {number | null} The parsed number or `null` if the formatted string does not match.
 */
export const parseCurrency = (formattedValue, locale, currency) => parse(formattedValue, createCurrencyFormat({ locale, currency }))
