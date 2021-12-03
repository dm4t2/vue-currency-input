<template>
  <input ref="inputRef" type="text" style="border: 1px solid" />
</template>

<script>

import useCurrencyInput from "vue-currency-input";
import { computed, watch } from '@vue/composition-api'

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      default: null
    },
    currency: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => ({ currency: props.currency }))
    const { inputRef, setValue } = useCurrencyInput(options.value)

    watch(
      () => props.value,
      (value) => {
        setValue(value)
      }
    )

    return { inputRef }
  }
}
</script>
