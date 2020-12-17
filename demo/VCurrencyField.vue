<template>
  <VTextField
    ref="inputRef"
    :value="formattedValue"
    dense
    hide-details
    outlined
  />
</template>

<script>
import useCurrencyInput from '../src'
import { watch } from '@vue/composition-api'

export default {
  name: 'VCurrencyField',
  props: {
    value: Number,
    options: Object
  },
  setup (props) {
    const { inputRef, formattedValue, setOptions, setValue } = useCurrencyInput(props.options)
    watch(() => props.options, (options) => setOptions(options))
    watch(() => props.value, (value) => setValue(value))

    return { inputRef, formattedValue }
  }
}
</script>
