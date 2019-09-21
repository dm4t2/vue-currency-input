<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :currency="currency"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <span>Position</span>
          <input v-model="position" value="prefix" type="radio"><span> Prefix</span>
          <input v-model="position" value="suffix" type="radio"><span> Suffix</span>
        </label>
      </p>
      <p>
        <label>
          <span>Symbol</span>
          <input type="text" v-model="currencySymbol">
        </label>
      </p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'i18n',
  data: () => ({
    value: 1234.5,
    currencySymbol: '₿ ',
    position: 'prefix'
  }),
  computed: {
    currency () {
      return { [this.position]: this.currencySymbol }
    }
  }
}
</script>
