import useCurrencyInput from './useCurrencyInput'
import CurrencyFormat from './currencyFormat'
import { CurrencyInputOptions } from './api'

/**
 * @deprecated Use the named export `useCurrencyInput` instead.
 */
export default useCurrencyInput
export * from './api'

const parse = (formattedValue: string, options: CurrencyInputOptions): number | null => {
  return new CurrencyFormat(options).parse(formattedValue)
}

export { useCurrencyInput, parse }
