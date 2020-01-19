<template>
  <input
    v-model="value"
    v-currency="{currency: 'USD', locale: 'en'}"
  >
</template>

<script>
export default {
  data: () => ({
    value: '1000'
  })
}
</script>
