# API

## Methods
### `parseCurrency(formattedValue, options)`
Parses a currency formatted string emitted by the `v-currency` directive to a number. This method is also exposed as Vue instance method `$parseCurrency` when [installed as Vue plugin](/guide/#installation).

### Arguments
#### `formattedValue` (String)
The currency formatted string to be parsed, for example `"$1,234.50"`.
#### `options` (Object)
The configured options of the respective `v-currency` directive. When using `$parseCurrency` this argument is optional und will default to the `globalOptions` of the [plugin options](/config/#plugin-options). 
### Returns
The parsed number (for example `1234.5`) or `null` if the formatted string does not conform.

### Example
<<< @/docs/api/ParseCurrencyExample.vue
