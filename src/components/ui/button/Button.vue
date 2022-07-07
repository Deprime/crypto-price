<script setup lang="ts">
  import { computed } from 'vue';
  import { Variants, Sizes } from './types';

  const varaintCssSet = {
    secondary: "bg-white text-gray-700 border border-solid border-gray-300 hover:bg-gray-100 hover:border-gray-400 active:border-gray-500",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
  }
  const sizeCssSet = {
    md: "px-4 py-2 text-sm leading-5 font-medium",
    lg: "px-6 py-3 text-base leading-6 font-medium",
  }

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: Variants.secondary,
      validator: (value: Variants) => Object.values(Variants).includes(value),
    },
    size: {
      type: String,
      default: Sizes.md,
      validator: (value: Sizes) => Object.values(Sizes).includes(value),
    },
  });

  const $$class = computed(() => {
    return [
      "rounded-md",
      "px-6 py-3",
      "transition-all duration-100 ease-out",
      (props.size && sizeCssSet[props.size]) ? sizeCssSet[props.size] : sizeCssSet.md,
      (props.variant && varaintCssSet[props.variant]) ? varaintCssSet[props.variant] : varaintCssSet.secondary,
      props.loading ? "xx-button-loading" : "",
      props.disabled ? "opacity-60" : "",
    ]
    .filter(i => i)
    .join(" ");
  })
</script>

<template>
  <button
    :disabled="disabled"
    :variant="variant"
    :class="$$class"
  >
    <slot />
  </button>
</template>
