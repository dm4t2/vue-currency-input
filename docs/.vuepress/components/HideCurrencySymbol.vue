<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :distraction-free="false"
      :hide-currency-symbol="hideCurrencySymbol"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <input
            v-model="hideCurrencySymbol"
            type="checkbox">
          <span>Always hide currency symbol</span>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HideCurrencySymbol',
  data: () => ({
    value: 1234.5,
    hideCurrencySymbol: false
  })
}
</script>
