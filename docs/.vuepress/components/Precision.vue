<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :distraction-free="true"
      :precision="{min, max}"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <span>Min digits</span>
          <input
            min="0"
            :max="max ? max : 20"
            v-model.number="min"
            type="range">
        </label>
        <code>{{ min != null ? min : 'null' }}</code>
      </p>
      <p>
        <label>
          <span>Max digits</span>
          <input
            :min="min ? min : 0"
            max="20"
            v-model.number="max"
            type="range">
        </label>
        <code>{{ max != null ? max : 'null' }}</code>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Precision',
  data: () => ({
    value: 3.1415926535,
    min: 0,
    max: 10
  })
}
</script>
