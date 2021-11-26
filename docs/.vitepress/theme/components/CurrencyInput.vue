<template>
  <input ref="inputRef" type="text" />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useCurrencyInput } from '../../../../src'

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    watch(
      () => props.modelValue,
      (modelValue) => {
        setValue(modelValue)
      }
    )

    return { inputRef }
  }
})
</script>
