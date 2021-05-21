<template>
  <div v-if="modelValue" class="w-screen h-screen fixed z-50 inset-0 flex bg-gray-600 bg-opacity-50" @click.self="$emit('update:modelValue', false)">
    <div class="max-w-md md:relative m-auto p-8 bg-white rounded w-full h-auto shadow">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue']
}
</script>
