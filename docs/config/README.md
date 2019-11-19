# Config Reference

::: tip
You can override the shipped defaults with the [plugin options](#plugin-options) so you don't have configure each component instance separately.
:::

## Component props
The `<currency-input>` component provides the following props:
Name | Type | Description
--- | --- | --- 
`value` | Number |  The value of the input. `v-model` is supported.
`currency` | String/Object | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`). Default is `EUR`. You can also pass an object `{prefix, suffix}` for customizing the currency symbol or `null` to hide the currency symbol permanently.
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is `undefined` (use the runtime's default locale).
`auto-decimal-mode` | Boolean | Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is `false` (the decimal symbol needs to be inserted manually).
`decimal-length` | Number | The number of displayed decimal digits. Default is `undefined` (use the currency's default). Must be between 0 and 20 and can only be applied for currencies that support decimal digits.
`distraction-free` | Boolean/Object | Whether to hide negligible decimal digits, the currency symbol and the grouping symbol on focus. Default is `true`. You can also pass an object of boolean properties to configure each option: `{hideNegligibleDecimalDigits, hideCurrencySymbol, hideGroupingSymbol}` (see [examples](/examples/#distraction-free-mode)). Using `false` will leave the formatted value untouched on focus.
`value-as-integer` | Boolean | Whether the number value should be handled as integer value. Default is `false`.
`min` | Number | Minimum value. Default is `null` (no limitation). Must be less than `max`.
`max` | Number | Maximum value. Default is `null` (no limitation). Must be greater than `min`.

## Directive options
The `v-currency` directive supports the same options as the `<currency-input>` component which have to be passed as object:

```vue
<template>
  <input v-currency="{
    currency: 'EUR',
    locale: undefined,
    autoDecimalMode: false,
    decimalLength: undefined,
    distractionFree: true,
    valueAsInteger: false,
    min: null,
    max: null
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
