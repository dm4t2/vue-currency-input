import useCurrencyInput from './useCurrencyInput'
import CurrencyFormat from './currencyFormat'
import { abs } from './utils'
import { CurrencyFormatOptions } from './api'

export const parseBigInt = (formattedValue: string, options: CurrencyFormatOptions) => new CurrencyFormat(options).parse(formattedValue)

export const parseNumber = (formattedValue: string, options: CurrencyFormatOptions): number | null => {
  const currencyFormat = new CurrencyFormat(options)
  const value = currencyFormat.parse(formattedValue)
  if (value != null) {
    if (abs(value) <= Number.MAX_SAFE_INTEGER) {
      let number = Number(value)
      if (currencyFormat.maximumFractionDigits) {
        number /= 10 ** currencyFormat.maximumFractionDigits
      }
      return number
    } else {
      throw new Error('Value exceeds Number.MAX_SAFE_INTEGER')
    }
  }
  return null
}

export * from './api'
export { useCurrencyInput }
