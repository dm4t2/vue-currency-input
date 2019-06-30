<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      class="demo__currency-input"/>
  </div>
</template>

<script>

export default {
  name: 'Basic',
  data: () => ({
    value: 1234.5
  })
}
</script>
