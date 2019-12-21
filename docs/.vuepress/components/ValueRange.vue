<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :value-range="{min, max}"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <span>Min value</span>
          <input
            min="-10000"
            :max="max ? max : 10000"
            v-model.number="min"
            type="range">
        </label>
        <code>{{ min !== undefined ? min : 'null' }}</code>
      </p>
      <p>
        <label>
          <span>Max value</span>
          <input
            :min="min ? min : -10000"
            max="10000"
            v-model.number="max"
            type="range">
        </label>
        <code>{{ max !== undefined ? max : 'null' }}</code>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ValueRange',
  data: () => ({
    value: 1234.5,
    min: undefined,
    max: undefined
  })
}
</script>
