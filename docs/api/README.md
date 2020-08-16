# API

## getValue
Returns the current number value of an input. This method is also exposed as Vue instance method `$ci.getValue` when [installed as Vue plugin](/guide/#installation).

#### Arguments
Name | Type | Description
--- | --- | --- 
`el` | HTMLInputElement | The input element the `v-currency` directive is bound to.

::: warning
If you use `v-currency` on a Vue component (for example Vuetify's `v-text-field`), make sure the `el` argument points to underlying input element and **not** to the component's root element.
:::

#### Returns
The current number value or `null` if empty.

#### Example
``` vue
<template>
  <div>
    <input
      ref="input"
      v-model="value"
      v-currency="options"
    >
    <p>Number value: {{ numberValue }}</p>
  </div>
</template>

<script>
import { CurrencyDirective, getValue } from 'vue-currency-input'

export default {
  directives: {
    currency: CurrencyDirective
  },
  data: () => ({
    value: '$1,234.50'
  }),
  computed: {
    numberValue () {
      return getValue(this.$refs.input)
      // OR using the instance method:
      // return this.$ci.getValue(this.$refs.input)
    }
  }
}
</script>
```

## setValue
Sets the value of an input programmatically. This method is also exposed as Vue instance method `$ci.setValue` when [installed as Vue plugin](/guide/#installation).

#### Arguments
Name | Type | Description
--- | --- | --- 
`el` | HTMLInputElement | The input element the `v-currency` directive is bound to.
`value` | Number | The number to be set. 

::: warning
If you use `v-currency` on a Vue component (for example Vuetify's `v-text-field`), make sure the `el` argument points to underlying input element and **not** to the component's root element.
:::

#### Example
``` vue
<template>
  <div>
    <input
      ref="input"
      v-model="value"
      v-currency
    >
    <button @click="onClick">Set value to 100</button>
  </div>
</template>

<script>
import { CurrencyDirective, setValue } from 'vue-currency-input'

export default {
  directives: {
    currency: CurrencyDirective
  },
  data: () => ({
    value: '$1,234.50'
  }),
  methods: {
    onClick() {
      setValue(this.$refs.input, 100)
      // OR using the instance method:
      // this.$ci.setValue(this.$refs.input, 100)
    }
  }
}
</script>
```
[Try it on CodeSandbox](https://codesandbox.io/s/vue-currency-input-set-value-programmatically-rv95r?file=/src/App.vue)
