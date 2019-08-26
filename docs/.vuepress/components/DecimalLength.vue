<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :decimal-length="decimalLength"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <span>Decimal length</span>
          <input
            :min="0"
            :max="20"
            v-model.number="decimalLength"
            type="range">
        </label>
        <code>{{ decimalLength }}</code>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DecimalLength',
  data: () => ({
    value: 3.1415926535,
    decimalLength: 10
  })
}
</script>
