<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :min="min"
      :max="max"
      :validate-on-input="validateOnInput"
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
        <code>{{ min != null ? min : 'null' }}</code>
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
        <code>{{ max != null ? max : 'null' }}</code>
      </p>
      <p>
        <label>
          <input
            v-model="validateOnInput"
            :disabled="min == null && max == null"
            type="checkbox">
          <span>Validate on input</span>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ValueRange',
  data: () => ({
    value: 1234.5,
    min: null,
    max: null,
    validateOnInput: false
  })
}
</script>
