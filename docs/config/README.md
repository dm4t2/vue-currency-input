# Config Reference

The following options can be passed as an object literal to the `useCurrencyInput` function.

Name | Type | Description
--- | --- | ---
`currency` (required) | String | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`).
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is `undefined` (use the default locale of the Browser).
`autoDecimalDigits` | Boolean | Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).
`precision` | Number/Object | The number of displayed decimal digits. Default is `undefined` (use the currency's default). Must be between 0 and 20 and can only be applied for currencies that support decimal digits. You can also pass an object `{min, max}` to use a precision range (ranges are not available when the `autoDecimalDigits` option is used).
`distractionFree` | Boolean/Object | Whether to hide negligible decimal digits, the currency symbol and the grouping symbol on focus. Default is `true`. You can also pass an object of boolean properties to configure each option: `{hideNegligibleDecimalDigits, hideCurrencySymbol, hideGroupingSymbol}`. Using `false` will leave the formatted value untouched on focus.
`valueAsInteger` | Boolean | Whether the number value should be handled as integer instead of float value. Default is `false`.
`valueRange` | Object | The range of accepted values as object `{min, max}`. Default is `undefined` (no value range). The validation is triggered on blur and automatically sets the respective threshold if out of range.
`allowNegative` | Boolean | Whether the input of negative values is allowed. Default is `true`. If `false` it prevents the user to press <kbd>-</kbd>.
