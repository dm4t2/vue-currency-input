<script setup lang="ts">
import { CurrencyInputOptions, useCurrencyInput } from '../../../../src'
import { computed } from 'vue'

const [model, modifiers] = defineModel<string | null>('modelValue', { required: true })
const props = defineProps<{ options: CurrencyInputOptions }>()
const { inputRef } = useCurrencyInput(
  computed(() => props.options),
  model,
  modifiers.lazy
)
// watch(numberValue, () => emit('update:modelValue', numberValue.value))
</script>

<template>
  <input
    ref="inputRef"
    type="text"
  />
</template>
