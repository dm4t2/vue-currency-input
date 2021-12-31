import { Ref } from 'vue-demi'
import CurrencyFormat from './currencyFormat'

export interface CurrencyInputValue {
  number: number | null
  formatted: string | null
}

export interface NumberRange {
  min?: number
  max?: number
}

export enum CurrencyDisplay {
  symbol = 'symbol',
  narrowSymbol = 'narrowSymbol',
  code = 'code',
  name = 'name',
  hidden = 'hidden'
}

export enum ValueScaling {
  precision = 'precision',
  thousands = 'thousands',
  millions = 'millions',
  billions = 'billions'
}

export interface CurrencyFormatOptions {
  locale?: string
  currency: string
  currencyDisplay?: CurrencyDisplay
  precision?: NumberRange | number
  accountingSign?: boolean
}

export interface CurrencyInputOptions extends CurrencyFormatOptions {
  /**
   * @deprecated Use `valueScaling` instead.
   */
  exportValueAsInteger?: boolean
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  autoDecimalDigits?: boolean
  autoSign?: boolean
  valueRange?: NumberRange
  useGrouping?: boolean
  valueScaling?: ValueScaling
}

export interface UseCurrencyInput {
  inputRef: Ref
  formattedValue: Ref<string | null>
  setValue: (number: number | null) => void
  setOptions: (options: CurrencyInputOptions) => void
}

export const parse = (formattedValue: string, options: CurrencyFormatOptions): number | null => {
  return new CurrencyFormat(options).parse(formattedValue)
}
