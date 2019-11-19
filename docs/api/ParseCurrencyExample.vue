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
      // or using the instance method when installed as plugin:
      // return this.$parseCurrency(this.value, this.options)
    }
  }
}
</script>
