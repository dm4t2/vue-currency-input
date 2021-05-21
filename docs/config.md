# Config Reference

The following options can be passed as an object literal to the `useCurrencyInput` function.

Name | Type | Description
--- | --- | ---
`currency` (required) | String | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`).
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is `undefined` (use the default locale of the Browser).
`autoDecimalDigits` | Boolean | Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).
`precision` | Number/Object | The number of displayed decimal digits. Default is `undefined` (use the currency's default, decimal digits will be hidden for integer numbers). Must be between 0 and 15 and can only be applied for currencies that support decimal digits.
`hideCurrencySymbolOnFocus` | Boolean | Whether to hide the currency symbol on focus. Default is `true`.
`hideGroupingSeparatorOnFocus` | Boolean | Whether to hide the grouping separator on focus. Default is `true`.
`hideNegligibleDecimalDigitsOnFocus` | Boolean | Whether to hide negligible decimal digits on focus. Default is `true`. 
`exportValueAsInteger` | Boolean | Whether the number value should be exported as integer instead of float value. Default is `false`.
`valueRange` | Object | The range of accepted values as object `{min, max}`. Default is `undefined` (no value range). The validation is triggered on blur and automatically sets the respective threshold if out of range.
`autoSign` | Boolean | Whether the minus symbol is automatically inserted or prevented to be inputted depending the configured `valueRange`. Default is `true`.
`useGrouping` | Boolean | Whether to use grouping separators such as thousands/lakh/crore separators.
