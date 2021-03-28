import { Ref } from 'vue-demi'

export interface DistractionFreeOptions {
  hideCurrencySymbol?: boolean,
  hideGroupingSymbol?: boolean,
  hideNegligibleDecimalDigits?: boolean
}

export interface NumberRange {
  min?: number,
  max?: number
}

export interface CurrencyInputOptions {
  locale?: string,
  currency: string,
  exportValueAsInteger?: boolean,
  distractionFree?: boolean | DistractionFreeOptions,
  precision?: number,
  autoDecimalDigits?: boolean,
  valueRange?: NumberRange,
  autoSign?: boolean,
  useGrouping?: boolean,
  decimalDigitsReplacement?: string
}

declare const useCurrencyInput: (options: CurrencyInputOptions) => {
  inputRef: Ref;
  formattedValue: Ref<string | null>;
  setValue: (number: number | null) => void;
  setOptions: (options: CurrencyInputOptions) => void;
}

export default useCurrencyInput
