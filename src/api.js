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
