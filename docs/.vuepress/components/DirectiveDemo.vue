<template>
  <div class="demo">
    <input
      v-model="value"
      v-currency="{locale, currency}"
      class="demo__currency-input"/>
    <p>Raw number value: <code>{{ numberValue }}</code></p>
  </div>
</template>

<script>
export default {
  name: 'DirectiveDemo',
  data: () => ({
    value: '$1,234.50',
    locale: 'en',
    currency: 'USD'
  }),
  computed: {
    numberValue () {
      return this.$parseCurrency(this.value, this.locale, this.currency)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "demo.scss";
</style>
