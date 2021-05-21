import { Ref } from 'vue-demi'

export interface CurrencyInputValue {
  number: number | null
  formatted: string | null
}

export interface NumberRange {
  min?: number
  max?: number
}

export interface CurrencyInputOptions {
  locale?: string
  currency: string
  exportValueAsInteger?: boolean
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  precision?: number
  autoDecimalDigits?: boolean
  autoSign?: boolean
  valueRange?: NumberRange
  useGrouping?: boolean
}

export interface UseCurrencyInput {
  inputRef: Ref
  formattedValue: Ref<string | null>
  setValue: (number: number | null) => void
  setOptions: (options: CurrencyInputOptions) => void
}
