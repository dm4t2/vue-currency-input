<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :distraction-free="distractionFree"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <input
            v-model="hideNegligibleFractionDigits"
            type="checkbox">
          <span>Hide negligible fraction digits on focus</span>
        </label>
      </p>
      <p>
        <label>
          <input
            v-model="hideCurrencySymbol"
            type="checkbox">
          <span>Hide currency symbol on focus</span>
        </label>
      </p>
      <p>
        <label>
          <input
            v-model="hideThousandsSeparatorSymbol"
            type="checkbox">
          <span>Hide thousands separator symbol on focus</span>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DistractionFree',
  data: () => ({
    value: 1234.5,
    hideNegligibleFractionDigits: false,
    hideCurrencySymbol: false,
    hideThousandsSeparatorSymbol: false,
  }),
  computed: {
    distractionFree () {
      return {
        hideNegligibleFractionDigits: this.hideNegligibleFractionDigits,
        hideCurrencySymbol: this.hideCurrencySymbol,
        hideThousandsSeparatorSymbol: this.hideThousandsSeparatorSymbol
      }
    }
  }
}
</script>
