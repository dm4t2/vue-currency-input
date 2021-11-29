# API

## Functions

### useCurrencyInput

```typescript
declare const useCurrencyInput: (options: CurrencyInputOptions) => UseCurrencyInput
```

### parse

```typescript
declare const parse: (formattedValue: string, options: CurrencyInputOptions) => number | null
```

## Enums

### CurrencyDisplay

```typescript
enum CurrencyDisplay {
  symbol = 'symbol',
  narrowSymbol = 'narrowSymbol',
  code = 'code',
  name = 'name',
  hidden = 'hidden'
}
```

## Types

### NumberRange

```typescript
interface NumberRange {
  min?: number
  max?: number
}
```

### CurrencyInputOptions

```typescript
interface CurrencyInputOptions {
  locale?: string
  currency: string
  currencyDisplay?: CurrencyDisplay
  exportValueAsInteger?: boolean
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  precision?: NumberRange | number
  autoDecimalDigits?: boolean
  autoSign?: boolean
  valueRange?: NumberRange
  useGrouping?: boolean
}
```

### UseCurrencyInput

```typescript
interface UseCurrencyInput {
  inputRef: Ref
  formattedValue: Ref<string | null>
  setValue: (number: number | null) => void
  setOptions: (options: CurrencyInputOptions) => void
}
```
