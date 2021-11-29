# Config Reference

The following options can be passed as an object literal to the `useCurrencyInput` function.

### currency

A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, for example `USD` or `EUR`. This option is **required**.

### locale

A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is `undefined` (use the default locale of the Browser).

### currencyDisplay

How to display the currency in currency formatting. Possible values are:

- `symbol` to use a localized currency symbol such as "€" (default value)
- `narrowSymbol` to use a narrow format symbol ("$100" rather than "US$100")
- `code` to use the ISO currency code
- `name` to use a localized currency name such as "dollar"
- `hidden` to hide the currency

### autoDecimalDigits

Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).

### precision

The number of displayed decimal digits. Default is `undefined` (use the currency's default, decimal digits will be hidden for integer numbers). Must be between 0 and 15 and can only be applied for currencies that support decimal digits.
You can also pass an object `{min, max}` to use a precision range (ranges are not available when using `autoDecimalDigits`).

### hideCurrencySymbolOnFocus

Whether to hide the currency symbol on focus. Default is `true`.

### hideGroupingSeparatorOnFocus

Whether to hide the grouping separator on focus. Default is `true`.

### hideNegligibleDecimalDigitsOnFocus

Whether to hide negligible decimal digits on focus. Default is `true`.

### exportValueAsInteger

Whether the number value should be exported as integer instead of float value. Default is `false`.
When used in combination with precision ranges, the value of `precision.max` will be used as a factor.

### valueRange

The range of accepted values as object `{min, max}`. Default is `undefined` (no value range). The validation is triggered on blur and automatically sets the respective threshold if out of range.

### autoSign

Whether the minus symbol is automatically inserted or prevented to be inputted depending on the configured `valueRange`. Default is `true`.

### useGrouping

Whether to use grouping separators such as thousands/lakh/crore separators.
