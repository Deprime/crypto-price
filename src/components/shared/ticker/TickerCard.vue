<script setup lang="ts">
  import { computed } from 'vue';
  import VueFeather from 'vue-feather';

  const DOMAIN = import.meta.env.VITE_CRYPTO_DOMAIN;

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
    image: {
      type: String,
      required: false
    },
    flag: {
      type: [null, Number],
      required: false,
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
  const onSetActive = (event: MouseEvent): void => {
    emit('setActive', props.id);
  }
</script>

<template>
  <figure :class="$$css">
    <div
      class="cursor-pointer p-4 flex flex-row items-center"
      @click="onSetActive"
    >
      <img
        v-if="image"
        :src="`${DOMAIN}${image}`"
        :alt="title"
        width="40"
        height="40"
        class="mr-4"
      />
      <div>
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
          <VueFeather
            v-if="flag"
            :type="(flag === 1) ? 'arrow-up' : 'arrow-down'"
            :class="(flag === 1) ? 'text-green-600' : 'text-red-600'"
          />
        </h3>
      </div>
    </div>

    <VueFeather
      @click="onTrash"
      type="trash-2"
      size="20"
      class="absolute top-4 right-4 inline-block z-10 text-gray-400 active:text-gray-500 transition-all duration-100 ease-out cursor-pointer"
    />
  </figure>
</template>
