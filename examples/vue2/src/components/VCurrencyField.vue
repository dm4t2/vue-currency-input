<template>
  <VTextField
    ref="inputRef"
    :value="formattedValue"
    hide-details
    outlined
    dense
  />
</template>

<script>
import useCurrencyInput from 'vue-currency-input'
import { watch } from '@vue/composition-api'

export default {
  name: 'VCurrencyField',
  props: {
    value: Number,
    options: Object
  },
  setup (props) {
    const {
      inputRef,
      formattedValue,
      setValue
    } = useCurrencyInput(props.options)

    watch(() => props.value, (value) => {
      setValue(value)
    })

    return { inputRef, formattedValue }
  }
}
</script>
