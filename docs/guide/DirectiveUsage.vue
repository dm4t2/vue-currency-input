<template>
  <input
    v-currency="{currency: 'USD', locale: 'en'}"
    v-model="value">
</template>

<script>
export default {
  data: () => ({
    value: '1000'
  })
}
</script>
