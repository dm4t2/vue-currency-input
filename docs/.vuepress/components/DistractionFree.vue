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
            v-model="hideNegligibleDecimalDigits"
            type="checkbox">
          <span>Hide negligible decimal digits</span>
        </label>
      </p>
      <p>
        <label>
          <input
            v-model="hideCurrencySymbol"
            type="checkbox">
          <span>Hide currency symbol</span>
        </label>
      </p>
      <p>
        <label>
          <input
            v-model="hideThousandsSeparatorSymbol"
            type="checkbox">
          <span>Hide thousands separator symbol</span>
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
    hideNegligibleDecimalDigits: false,
    hideCurrencySymbol: false,
    hideThousandsSeparatorSymbol: false,
  }),
  computed: {
    distractionFree () {
      return {
        hideNegligibleDecimalDigits: this.hideNegligibleDecimalDigits,
        hideCurrencySymbol: this.hideCurrencySymbol,
        hideThousandsSeparatorSymbol: this.hideThousandsSeparatorSymbol
      }
    }
  }
}
</script>
