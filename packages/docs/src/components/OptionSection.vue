<template>
  <section class="mb-12 min-w-0">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xl font-medium">{{ label }}</span>
      <Switch
        v-if="modelValue !== undefined"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
    <div v-if="description" class="mb-3">
      {{ description }}
    </div>
    <slot />
  </section>
</template>

<script lang="ts">
/* eslint-disable vue/no-reserved-component-names */
import Switch from "./Switch.vue";
export default {
  name: "OptionSection",
  components: { Switch },
  props: {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped></style>
