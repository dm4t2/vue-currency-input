<template>
  <input
    ref="inputRef"
    type="text"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { CurrencyInputOptions, useCurrencyInput } from '../../../../src'

const emit = defineEmits(['update:modelValue'])
// eslint-disable-next-line vue/require-default-prop
const props = defineProps({ modelValue: Number, options: Object })
const { inputRef, setOptions, setValue, getNumberValue } = useCurrencyInput({
  options: { currency: 'EUR' },
  onInput: () => {
    emit('update:modelValue', getNumberValue())
  }
})

watch(
  () => props.options,
  (options) => {
    setOptions(options as CurrencyInputOptions)
  }
)

watch(
  () => props.modelValue,
  (modelValue) => {
    setValue(modelValue ?? null)
  }
)
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  console.log(target.value)
}
</script>
