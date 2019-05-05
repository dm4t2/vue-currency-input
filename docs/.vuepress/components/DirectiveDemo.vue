<template>
  <div class="demo">
    <input
      v-model="value"
      v-currency
      class="demo__currency-input"/>
    <p>Raw number value: <code>{{ numberValue }}</code></p>
  </div>
</template>

<script>
export default {
  name: 'DirectiveDemo',
  data: () => ({
    value: 1234.55
  }),
  computed: {
    numberValue () {
      return this.$parseCurrency(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "demo.scss";
</style>
