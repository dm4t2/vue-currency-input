# API

## Methods
### `parseCurrency(formattedValue, locale, currency)`
Parses a number from a currency formatted string. This method is also exposed as Vue instance method `$parseCurrency` when installed as Vue plugin.

### Arguments
#### `formattedValue` (String)
The currency formatted string to be parsed, for example `$1,234.50`.
#### `locale` (String)
A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`).
#### `currency` (String/Object)
A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`), an object `{prefix, suffix}` or `null`.
#### `valueAsInteger` (Boolean)
Use `true` to restore the decimal digits of a formatted value, when using the `valueAsInteger` option of the component/directive.
For example, `"12345"` will be parsed to `123.45` assuming decimal length is 2. Defaults to `false`.

### Returns
The parsed number (for example `1234.5`) or `null` if the formatted string does not conform.

### Example
```vue
<template>
  <div>
    <input
      v-model="value"
      v-currency="{locale, currency}"/>
    <p>Raw number value: {{ numberValue }}</p>
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
    numberValue () {
      return parseCurrency(this.value, this.locale, this.currency)
    }
  }
}
</script>
```
