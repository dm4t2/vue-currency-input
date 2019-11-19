<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :value-as-integer="valueAsInteger"
      class="demo__currency-input"/>
    <p>Number value: <code>{{ value != null ? value : 'null' }}</code></p>
    <label><input type="checkbox" v-model="valueAsInteger">Value as integer</label>
  </div>
</template>

<script>
export default {
  name: 'ValueAsInteger',
  data: () => ({
    value: 123456,
    valueAsInteger: true
  })
}
</script>
