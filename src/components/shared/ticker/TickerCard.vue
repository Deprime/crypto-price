<script setup lang="ts">
  import { computed } from 'vue';
  import VueFeather from 'vue-feather';

  // Emits
  const emit = defineEmits(['trash', 'setActive']);

  // Props
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  });

  // Computed
  const $$css = computed(() => {
    return [
      "transition-all duration-200 ease-out",
      "bg-white rounded-md relative border-solid border select-none",
      props.isActive ? "border-black ring-2 ring-black ring-inset" : "border-gray-300",
    ]
    .join(" ");
  });

  // Methods
  /**
   * On trash
   */
  const onTrash = (event: PointerEvent): void => {
    emit('trash', props.id);
  }

  /**
   * Set ticker active
   */
  const onSetActive = (event: MouseEvent) => {
    emit('setActive', props.id);
  }
</script>

<template>
  <figure :class="$$css">
    <div
      class="cursor-pointer p-4"
      @click="onSetActive"
    >
      <h4 class="text-sm leading-5 pb-2 pr-4 font-medium text-gray-900">
        {{ title }}
        <VueFeather
          title="Streaming"
          v-if="isLive"
          type="radio"
          size="18"
          class="text-indigo-600 ml-1 -mb-1"
        />
      </h4>
      <h3 class="text-3xl leading-6 font-medium text-gray-900">
        {{ price ? `${price}$` : "" }}
      </h3>
    </div>

    <div class="absolute top-4 right-4 inline-block z-10">
      <VueFeather
        @click="onTrash"
        type="trash-2"
        size="20"
        class="text-gray-400 active:text-gray-500 transition-all duration-100 ease-out cursor-pointer"
      />
    </div>
  </figure>
</template>
