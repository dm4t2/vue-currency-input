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
  allowNegative?: boolean,
  useGrouping?: boolean
}

declare const useCurrencyInput: (options: CurrencyInputOptions) => {
  formattedValue: string
}

export default useCurrencyInput
