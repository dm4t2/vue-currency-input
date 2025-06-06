<template>
  <div
    v-if="modelValue"
    class="w-screen h-screen fixed z-50 inset-0 flex bg-gray-600/50 dark:bg-neutral-900/70"
    @click.self="$emit('update:modelValue', false)"
  >
    <div
      class="max-w-md md:relative m-auto p-8 bg-white dark:bg-neutral-700 rounded w-full h-auto shadow"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names,vue/no-reserved-component-names
  name: "Dialog",
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
};
</script>
