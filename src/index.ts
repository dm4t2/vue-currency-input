import useCurrencyInput from './useCurrencyInput'
import CurrencyFormat from './currencyFormat'
import { CurrencyFormatOptions } from './api'

const parse = (formattedValue: string | null, options: CurrencyFormatOptions): number | null => {
  return new CurrencyFormat(options).parse(formattedValue)
}

/**
 * @deprecated Use the named export `useCurrencyInput` instead.
 */
export default useCurrencyInput
export * from './api'

export { useCurrencyInput, parse }
