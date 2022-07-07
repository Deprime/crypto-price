<script setup lang="ts">
  import "./Textarea.scss";

  import { computed } from 'vue'

  const props = defineProps({
    value: {
      type: String,
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
      default: "",
    },
    rows: {
      type: Number,
      default: 3,
    }
  });

  const $$class = computed(() => {
    return [
      "xx-textarea",
      `xx-textarea-${props.variant}`,
      props.loading ? "xx-textarea-loading" : "",
      props.disabled ? "xx-textarea-disabled" : "",
    ]
    .filter(i => i)
    .join(" ");
  })

</script>

<template>
  <textarea
    :rows="rows"
    :variant="variant"
    :disabled="disabled"
    :placeholder="placeholder"
    :value="value"
    :class="$$class"
  ></textarea>
</template>
