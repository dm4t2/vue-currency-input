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
import { ref } from '@vue/composition-api'
import useCurrencyInput from '../src'

export default {
  name: 'VCurrencyField',
  props: {
    value: Number,
    locale: String,
    currency: String,
    distractionFree: [Boolean, Object],
    precision: [Number, Object],
    autoDecimalDigits: Boolean,
    valueAsInteger: Boolean,
    valueRange: Object,
    allowNegative: Boolean
  },
  setup (props, { emit }) {
    const inputRef = ref(null)

    const { formattedValue } = useCurrencyInput({
      inputRef,
      props,
      emit
    })

    return { inputRef, formattedValue }
  }
}
</script>
