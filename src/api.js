import createCurrencyFormat from './utils/createCurrencyFormat'
import parse from './utils/parse'

/**
 * Parses a number from a currency formatted string.
 *
 * @param {String} formattedValue The currency formatted string to be parsed, for example `$1,234.50`.
 * @param {Object} options The configured options of the respective `v-currency` directive.
 * @returns {number | null} The parsed number or `null` if the formatted string does not match.
 */
export const parseCurrency = (formattedValue, options) => parse(formattedValue, createCurrencyFormat(options), options.valueAsInteger)
