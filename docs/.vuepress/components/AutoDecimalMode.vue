<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :auto-decimal-mode="true"
      class="demo__currency-input"/>
  </div>
</template>

<script>

export default {
  name: 'AutoDecimalMode',
  data: () => ({
    value: null
  })
}
</script>
