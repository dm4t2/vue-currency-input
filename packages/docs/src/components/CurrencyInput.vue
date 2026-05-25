<script setup lang="ts">
import { CurrencyInputOptions, useCurrencyInput } from "vue-currency-input";
import { computed } from "vue";
import { Input } from "@/components/ui/input";
const [modelValue, modelModifiers] = defineModel<string | number | null>({
  required: true,
});
const props = defineProps<{ options: CurrencyInputOptions }>();
const { inputRef } = useCurrencyInput({
  options: computed(() => props.options),
  modelValue,
  lazy: modelModifiers.lazy,
});
</script>

<template>
  <Input ref="inputRef" type="text" />
</template>
