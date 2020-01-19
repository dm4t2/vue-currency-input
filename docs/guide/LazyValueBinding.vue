<template>
  <currency-input
    :value="value"
    @change="value = $event"
  />
</template>

<script>
export default {
  data: () => ({
    value: 1000
  })
}
</script>
