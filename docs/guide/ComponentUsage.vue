<template>
  <currency-input
    v-model="value"
    currency="EUR"
    locale="de"/>
</template>

<script>
export default {
  data: () => ({
    value: 1000
  })
}
</script>
