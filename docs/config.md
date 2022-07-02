# Config Reference

The following options can be passed as an object literal to the `useCurrencyInput` function.

### currency

A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, for example `"USD"` or `"EUR"`. This option is **required**.

### locale

A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `"en"` or `"de-DE"`). Default is `undefined` (use the default locale of the Browser).

### currencyDisplay

How to display the currency in currency formatting. Possible values are:

- `"symbol"` to use a localized currency symbol such as "€" (default value)
- `"narrowSymbol"` to use a narrow format symbol ("$100" rather than "US$100")
- `"code"` to use the ISO currency code
- `"name"` to use a localized currency name such as "dollar"
- `"hidden"` to hide the currency

### accountingSign

Whether to use accounting sign formatting, for example wrapping negative values with parentheses instead of prepending a minus sign.

### autoDecimalDigits

Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).

### precision

The number of displayed decimal digits. Default is `undefined` (use the currency's default, decimal digits will be hidden for integer numbers). Must be between 0 and 15 and can only be applied for currencies that support decimal digits.
You can also pass an object `{min, max}` to use a precision range.

### hideCurrencySymbolOnFocus

Whether to hide the currency symbol on focus. Default is `true`.

### hideGroupingSeparatorOnFocus

Whether to hide the grouping separator on focus. Default is `true`.

### hideNegligibleDecimalDigitsOnFocus

Whether to hide negligible decimal digits on focus. Default is `true`.

### valueScaling

Applies a scaling to the exported value. Possible values are:

- `"precision"` for scaling float values automatically to integers depending on the current `precision`, for example 1.23 -> 123
- `"thounsands"` for using a scaling factor of 1,000
- `"millions""` for using scaling factor of 1,000,000
- `"billions"` for using a scaling factor of 1,000,000,000

### valueRange

The range of accepted values as object `{min, max}`. Default is `undefined` (no value range). The validation is triggered on blur and automatically sets the respective threshold if out of range.

### useGrouping

Whether to use grouping separators such as thousands/lakh/crore separators.
