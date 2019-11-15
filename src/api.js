import createCurrencyFormat from './utils/createCurrencyFormat'
import parse from './utils/parse'

/**
 * Parses a number from a currency formatted string.
 * @param {String} formattedValue The currency formatted string to be parsed, for example `$1,234.50`.
 * @param {String} locale A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`).
 * @param {String | Object} currency A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`), an object `{prefix, suffix}` or `null`.
 * @param {Boolean} valueAsInteger Use `true` to restore the decimal digits of a formatted value, when using the `valueAsInteger` option of the component/directive.
 * @returns {number | null} The parsed number or `null` if the formatted string does not match.
 */
export const parseCurrency = (formattedValue, locale, currency, valueAsInteger) => parse(formattedValue, createCurrencyFormat({ locale, currency }), valueAsInteger)
