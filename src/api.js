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
export const parse = (formattedValue, options) => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  return new NumberFormat(mergedOptions).parse(formattedValue, mergedOptions.valueAsInteger)
}

/**
 * Returns the current number value of an input.
 *
 * @param ref {Element | VueConstructor} The element or Vue component the `v-currency` directive is bound to.
 * @returns {Number | null} The current number value or `null` if empty.
 */
export const getValue = (ref) => (ref.$el || ref).$ci.getValue()

/**
 * Sets the value of an input programmatically.
 *
 * @param ref {Element | VueConstructor} The element or Vue component the `v-currency` directive is bound to.
 * @param {Number} value The number to be set.
 */
export const setValue = (ref, value) => {
  (ref.$el || ref).$ci.setValue(value)
}
