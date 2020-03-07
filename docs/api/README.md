# API

## setValue
Sets the value of a input programmatically.

#### Arguments
Name | Type | Description
--- | --- | --- 
`el` | HTMLInputElement | The input element the `v-currency` directive is bound to.
`value` | Number | The number to be set. 

::: warning
If you use `v-currency` on a Vue component (for example Vuetify's `v-text-field`), make sure the `el` argument points to underlying input element and **not** to the component's root element.
:::

## parseCurrency
Parses a currency formatted string emitted by the `v-currency` directive to a number. This method is also exposed as Vue instance method `$parseCurrency` when [installed as Vue plugin](/guide/#installation).

#### Arguments
Name | Type | Description
--- | --- | --- 
`formattedValue` | String | The currency formatted string to be parsed, for example `"$1,234.50"`.
`options` | Object | The configured options of the respective `v-currency` directive. When using `$parseCurrency` this argument is optional and defaults to the `globalOptions` of the [plugin options](/config/#plugin-options).

#### Returns
The parsed number (for example `1234.5`) or `null` if the formatted string does not conform.

#### Example
``` vue
<template>
  <div>
    <input
      v-model="value"
      v-currency="options"
    >
    <p>Number value: {{ numberValue }}</p>
  </div>
</template>

<script>
import { CurrencyDirective, parseCurrency } from 'vue-currency-input'

export default {
  directives: {
    currency: CurrencyDirective
  },
  data: () => ({
    value: '$1,234.50',
    locale: 'en',
    currency: 'USD'
  }),
  computed: {
    options () {
      return {
        locale: this.locale,
        currency: this.currency
      }
    },
    numberValue () {
      return parseCurrency(this.value, this.options)
      // OR using the instance method:
      // return this.$parseCurrency(this.value, this.options)
    }
  }
}
</script>
```
