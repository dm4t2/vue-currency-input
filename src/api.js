import dispatchEvent from './utils/dispatchEvent'
import { toExternalNumberModel } from './utils/numberUtils'

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
 * @param {HTMLInputElement} el The input element the `v-currency` directive is bound to.
 * @returns {Number | null} The current number value or `null` if empty.
 */
export const getValue = el => {
  const { numberValue, currencyFormat, options } = el.$ci
  return toExternalNumberModel(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
}

/**
 * Sets the value of an input programmatically.
 *
 * @param {HTMLInputElement} el The input element the `v-currency` directive is bound to.
 * @param {Number} value The number to be set.
 */
export const setValue = (el, value) => dispatchEvent(el, 'format', { value })
