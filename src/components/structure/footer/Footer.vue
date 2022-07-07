<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia'

  // Components
  import { Button } from '@/components/ui';

  // Stores
  import { useTickerStore } from '@/stores/ticker';

  const { page, perPage, tickerList } = storeToRefs(useTickerStore());
  const { setPage } = useTickerStore();

  const totalPages = computed(() => Math.ceil(tickerList.value.length / perPage.value));
  const hasPrev = computed(() => page.value > 1);
  const hasNext = computed(() => page.value < totalPages.value);

  // Methods
  const prevPage = async ()  => {
    const next = page.value - 1;
    await setPage(next);
  }

  const nextPage = async () => {
    const next = page.value + 1;
    await setPage(next);
  }
</script>

<template>
  <footer class="flex flex-row items-center bg-white lg:bg-gray-100 border-t border-solid border-gray-200 p-4 fixed z-20 w-full bottom-0">
    <div class="basis-1/4 lg:basis-auto lg:pr-2">
      <Button
        @click="prevPage"
        :disabled="!hasPrev"
      >
        Назад
      </Button>
    </div>
    <div class="basis-2/4 lg:basis-full text-center lg:text-left lg:order-first text-xs sm:text-sm">
      Показано
      <span class="block sm:inline-block"> 6 результатов из {{ tickerList.length }}</span> <span class="block sm:inline-block">[страница {{ page }} из {{ totalPages }}]</span>
    </div>
    <div class="basis-1/4 lg:basis-auto text-right">
      <Button
        @click="nextPage"
        :disabled="!hasNext"
      >
        Вперед
      </Button>
    </div>
  </footer>
</template>
