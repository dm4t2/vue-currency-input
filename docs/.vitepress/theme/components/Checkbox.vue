<template>
  <label class="flex items-center" :class="{ 'text-gray-300 cursor-not-allowed': disabled, 'cursor-pointer': !disabled }">
    <input
      :checked="modelValue"
      :disabled="disabled"
      type="checkbox"
      class="w-5 h-5 mr-2 rounded rounded border-gray-300 shadow-sm disabled:(text-gray-300 cursor-not-allowed) not-disabled:(text-primary cursor-pointer) focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped></style>
