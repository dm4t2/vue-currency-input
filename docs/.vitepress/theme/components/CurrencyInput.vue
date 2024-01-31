<script lang="ts" setup>
import { CurrencyInputOptions, useCurrencyInput } from '../../../../src'
import { computed, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])
// eslint-disable-next-line vue/require-default-prop
const props = defineProps({ modelValue: String, options: Object })
const options = computed(() => props.options as CurrencyInputOptions)
const { inputRef, numberValue } = useCurrencyInput(options, props.modelValue)
watch(numberValue, () => emit('update:modelValue', numberValue.value))
</script>

<template>
  <input
    ref="inputRef"
    type="text"
  />
</template>
