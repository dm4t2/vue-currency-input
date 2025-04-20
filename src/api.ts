export interface NumberRange {
  min?: number
  max?: number
}

export interface ValueRange {
  min?: number | string
  max?: number | string
}

export enum CurrencyDisplay {
  symbol = 'symbol',
  narrowSymbol = 'narrowSymbol',
  code = 'code',
  name = 'name',
  hidden = 'hidden'
}

export interface CurrencyFormatOptions {
  locale?: string
  currency: string
  currencyDisplay?: CurrencyDisplay
  precision?: NumberRange | number
  accountingSign?: boolean
  useGrouping?: boolean
}

export interface CurrencyInputOptions extends CurrencyFormatOptions {
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  autoDecimalDigits?: boolean
  valueRange?: ValueRange
}
