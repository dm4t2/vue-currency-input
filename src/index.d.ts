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
  valueAsInteger?: boolean,
  distractionFree?: boolean | DistractionFreeOptions,
  precision?: number | NumberRange,
  autoDecimalDigits?: boolean,
  valueRange?: NumberRange,
  allowNegative?: boolean
}

export interface ComposableOptions {
  inputRef: Ref,
  props: any,

  emit (event: string, value: number | null): void
}

declare const useCurrencyInput: ({ emit, inputRef, props }: ComposableOptions) => {
  formattedValue: string
}

export default useCurrencyInput
