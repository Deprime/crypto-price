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
    pricePrecision: {
      type: Number,
      default: 14,
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
  const $$formattedPrice = computed(() => {
    return (props.price.toString().length <= props.pricePrecision)
      ? props.price
      : parseFloat(props.price.toPrecision(props.pricePrecision));
  });

  const $$css = computed(() => {
    return [
      "transition-all duration-200 ease-out",
      "bg-white rounded-md relative border-solid border select-none overflow-x-auto",
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
        width="30"
        height="30"
        class="mr-4"
      />
      <div>
        <h4 class="text-sm pb-2 pr-4 font-medium text-gray-900">
          {{ title }}
          <VueFeather
            v-if="isLive"
            title="Streaming"
            type="radio"
            size="18"
            class="text-indigo-600 ml-1 -mb-1"
          />
        </h4>
        <h3 class="text-2xl leading-6 font-medium text-ellipsis text-gray-900">
          {{ price ? `${$$formattedPrice}$` : "[No price data]" }}
          <VueFeather
            v-if="flag"
            size="20"
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
      class="absolute top-4 right-4 z-10 bg-white icon"
    />
  </figure>
</template>
