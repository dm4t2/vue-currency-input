# API

## Functions

### useCurrencyInput

```typescript
declare function useCurrencyInput(options: CurrencyInputOptions, autoEmit?: boolean): UseCurrencyInput;
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
  accountingSign?: boolean;
  autoDecimalDigits?: boolean;
  currency: string;
  currencyDisplay?: CurrencyDisplay;
  hideCurrencySymbolOnFocus?: boolean;
  hideGroupingSeparatorOnFocus?: boolean;
  hideNegligibleDecimalDigitsOnFocus?: boolean;
  locale?: string;
  precision?: NumberRange | number;
  useGrouping?: boolean;
  valueRange?: NumberRange;
  valueScaling?: ValueScaling;
}
```

### UseCurrencyInput

```typescript
interface UseCurrencyInput {
  formattedValue: Ref<string | null>;
  inputRef: Ref;
  numberValue: Ref<number | null>;
  setOptions: (options: CurrencyInputOptions) => void;
  setValue: (number: number | null) => void;
}
```
