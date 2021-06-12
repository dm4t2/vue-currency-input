<template>
  <div
    tabindex="0"
    role="checkbox"
    :aria-checked="modelValue"
    class="transition-all cursor-pointer flex justify-between items-center rounded-full focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ring-offset-1"
    @keydown.space.prevent="$emit('update:modelValue', !modelValue)"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-primary': modelValue }">
      <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-4': modelValue }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Switch',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue']
})
</script>
