<script setup lang="ts">

  import { computed, ref } from 'vue';
  import { v4 as uuid } from '@lukeed/uuid';

  // Emits
  const emit = defineEmits(['update:modelValue']);

  // id for label
  const uid = uuid();
  const focus = ref(false)

  const props = defineProps({
    inputCss: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nativeType: {
      type: String,
      default: "text",
    },
    variant: {
      type: String,
      default: "default",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  });

  const $$css = computed(() => {
    return [
      "relative",
      "px-3 py-2",
      "rounded-md",
      "border border-solid border-gray-300",
      "placeholder:text-gray-500",
      // props.loading ? "" : "",
      props.disabled ? "bg-gray-100" : "bg-white",
    ]
    .join(" ");
  });

  const $$inputCss = computed(() => {
    return [
      "grow bg-transparent text-gray-500 outline-none",
      props.inputCss,
    ]
    .join(" ");
  });

  const input = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }
</script>

<template>
  <div :class="$$css">
    <label
      v-if="label"
      :for="uid"
      class="text-xs leading-4 font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <div class="flex flex-row">
      <slot name="prepend"></slot>
      <input
        autocomplete="off"
        :class="$$inputCss"
        :id="uid"
        :disabled="disabled"
        :type="nativeType"
        :variant="variant"
        :placeholder="placeholder"
        :value="modelValue"
        @input="input"
        @focus="focus = true"
        @blur="focus = false"
      />
    </div>
    <template v-if="loading">
      <svg class="absolute right-2 bottom-2.5 animate-spin text-gray-500 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </template>
  </div>
</template>
