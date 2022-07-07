<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia'

  // Stores
  import { useTickerStore } from '@/stores/ticker';

// Components
  import { Button, Input } from '@/components/ui';

  const { addTicker, socketResubscribe } = useTickerStore();
  const { loading } = storeToRefs(useTickerStore())
  const coin = ref("");
  const solr = ref("");

  const canSubmit = computed(() => coin.value.length > 2);

  /**
   * On submit
   */
  const onSubmit = async (e: Event): Promise<any> =>  {
    e.preventDefault();
    if (coin.value.length < 3) {
      return;
    }

    await addTicker(coin.value);
    socketResubscribe();
    coin.value = "";
  };
</script>

<template>
  <div class="p-0 sm:p-4">
    <form @submit="(e) => onSubmit(e)" class="bg-white sm:rounded-lg p-4">
      <div class=" flex flex-row">
        <Input
          class="mb-3 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
          label="Тикер"
          placeholder="Например DOGE"
          :value="coin"
          v-model="coin"
          :loading="loading"
          :disabled="loading"
        />
      </div>
      <Button
        size="lg"
        variant="primary"
        type="submit"
        :disabled="loading || !canSubmit"
      >
        Добавить
      </Button>
    </form>
  </div>
</template>
