# Config Reference

::: tip
You can override the shipped defaults with the [plugin options](#plugin-options) so you don't have configure each component instance separately.
:::

## Component
### Props
Name | Type | Description
--- | --- | --- 
`value` | Number |  The value of the input. `v-model` is supported.
`currency` | String/Object | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`). Default is `EUR`. You can also pass an object `{prefix, suffix}` for customizing the currency symbol or `null` to hide the currency symbol permanently.
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is `undefined` (use the runtime's default locale).
`auto-decimal-mode` | Boolean | Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).
`precision` | Number/Object | The number of displayed decimal digits. Default is `undefined` (use the currency's default). Must be between 0 and 20 and can only be applied for currencies that support decimal digits. You can also pass an object `{min, max}` to use a precision range (ranges are not available when using `auto-decimal-mode` or `value-as-integer`).
`distraction-free` | Boolean/Object | Whether to hide negligible decimal digits, the currency symbol and the grouping symbol on focus. Default is `true`. You can also pass an object of boolean properties to configure each option: `{hideNegligibleDecimalDigits, hideCurrencySymbol, hideGroupingSymbol}`. Using `false` will leave the formatted value untouched on focus.
`value-as-integer` | Boolean | Whether the number value should be handled as integer instead of float value. Default is `false`.
`value-range` | Object | The range of accepted values as object `{min, max}`. Default is `undefined` (no value range). The validation is triggered on blur and automatically sets the respective threshold if out of range.
`allow-negative` | Boolean | Whether the input of negative values is allowed. Default is `true`. If `false` it prevents the user to press <kbd>-</kbd>.

### Methods
Name | Arguments | Description
--- | --- | --- 
`setValue` | `value` (Number) | Sets a value programmatically.

## Directive options
The `v-currency` directive supports the same options as the `<currency-input>` component which have to be passed as object:

```vue
<template>
  <input v-currency="{
    currency: 'USD',
    locale: 'en-US'
  }"/>
</template>
```

## Plugin options
To customize the plugin installation you can optionally pass an `options` object to `Vue.use()`:
```js
Vue.use(VueCurrencyInput, {
  globalOptions: { 
    currency: 'USD' // only override the default currency 'EUR' with 'USD'
  },
  componentName: 'MoneyInput', // now you can use the component with <money-input>
  ...
})
```
Valid object keys are:

Key | Type | Description
--- | --- | --- 
`globalOptions` | Object | Overriding of the shipped default options. Same object structure as [directive options](#directive-options).
`componentName` | String | The name with which the component is to be registered. Default is `CurrencyInput`.
`directiveName` | String | The name with which the directive is to be registered. Default is `currency`.
