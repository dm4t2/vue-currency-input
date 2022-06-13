# API

## Functions

### useCurrencyInput

```typescript
declare const useCurrencyInput: (options: CurrencyInputOptions, autoEmit?: boolean) => UseCurrencyInput
```

### parse

```typescript
declare const parse: (formattedValue: string | null, options: CurrencyFormatOptions) => number | null
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

### CurrencyFormatOptions

```typescript
interface CurrencyFormatOptions {
  locale?: string
  currency: string
  currencyDisplay?: CurrencyDisplay
  precision?: NumberRange | number
  accountingSign?: boolean
}
```

### CurrencyInputOptions

```typescript
interface CurrencyInputOptions extends CurrencyFormatOptions {
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
```

### UseCurrencyInput

```typescript
interface UseCurrencyInput {
  inputRef: Ref
  numberValue: Ref<number | null>
  formattedValue: Ref<string | null>
  setValue: (number: number | null) => void
  setOptions: (options: CurrencyInputOptions) => void
}
```
