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

### ValueScaling

```typescript
enum ValueScaling {
  precision = 'precision',
  thousands = 'thousands',
  millions = 'millions',
  billions = 'billions'
}
```

## Interfaces

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
  /**
   * @deprecated Use `valueScaling` instead.
   */
  exportValueAsInteger?: boolean
  hideCurrencySymbolOnFocus?: boolean
  hideGroupingSeparatorOnFocus?: boolean
  hideNegligibleDecimalDigitsOnFocus?: boolean
  precision?: NumberRange | number
  autoDecimalDigits?: boolean
  autoSign?: boolean
  valueRange?: NumberRange
  useGrouping?: boolean
  valueScaling?: ValueScaling
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
