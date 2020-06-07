import dispatchEvent from './utils/dispatchEvent'
import { toExternalNumberModel } from './utils/numberUtils'
import NumberFormat from './numberFormat'

export const DEFAULT_OPTIONS = {
  locale: undefined,
  currency: 'EUR',
  valueAsInteger: false,
  distractionFree: true,
  precision: undefined,
  autoDecimalMode: false,
  valueRange: undefined,
  allowNegative: true
}

/**
 * Parses a number from a currency formatted string.
 *
 * @param {String} formattedValue The currency formatted string to be parsed, for example `$1,234.50`.
 * @param {Object} options The configured options of the respective `v-currency` directive.
 * @returns {Number | null} The parsed number or `null` if the formatted string does not match.
 */
export const parseCurrency = (formattedValue, options) => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  const numberFormat = new NumberFormat(mergedOptions)
  return toExternalNumberModel(numberFormat.parse(formattedValue), mergedOptions.valueAsInteger, numberFormat.maximumFractionDigits)
}

/**
 * Sets a value of a input programmatically.
 *
 * @param {HTMLInputElement} el An input element using on the `v-currency` directive.
 * @param {Number} value The number to be set.
 */
export const setValue = (el, value) => dispatchEvent(el, 'format', { value })
