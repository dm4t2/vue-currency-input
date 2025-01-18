import { Ref } from 'vue'

/**
 * @internal
 */
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
  tenThousands = 'tenThousands',
  millions = 'millions',
  billions = 'billions'
}

export interface CurrencyInputOptions {
  accountingSign?: boolean
  autoDecimalDigits?: boolean
  currency: string
  currencyDisplay?: CurrencyDisplay
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  locale?: string
  precision?: NumberRange | number
  useGrouping?: boolean
  valueRange?: NumberRange
  valueScaling?: ValueScaling
}

export interface UseCurrencyInput {
  formattedValue: Ref<string | null>
  inputRef: Ref
  numberValue: Ref<number | null>
  setOptions: (options: CurrencyInputOptions) => void
  setValue: (number: number | null) => void
}
