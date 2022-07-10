<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useI18n } from "vue-i18n";
  import VueFeather from 'vue-feather';

  // Api services
  import cryptocompareApi from '@/api/cryptocompare';

  // Stores
  import { useTickerStore } from '@/stores/ticker';
  import { useSettingsStore } from '@/stores/settings';

  // Components
  import { Button, Input } from '@/components/ui';

  const { t } = useI18n();
  const { addTicker, socketResubscribe } = useTickerStore();
  const { loading } = storeToRefs(useTickerStore());
  const { toggleSettings } = useSettingsStore();

  // Data
  const coin = ref("");
  const allCoins = ref({});

  // Computed
  const canSubmit = computed(() => coin.value.length > 2);

  // Methods
  /**
   * On submit
   */
  const onSubmit = async (e: Event): Promise<any> =>  {
    e.preventDefault();
    if (coin.value.length < 3) {
      return;
    }

    try {
      await addTicker(coin.value);
    }
    finally {
      socketResubscribe();
      coin.value = "";
    }
  };

  onMounted(async () => {
    try {
      // const response = await cryptocompareApi.getAllCoins();
    }
    catch (error) {
      throw new Error(error);
    }
  })
</script>

<template>
  <div class="p-0 sm:p-4">
    <form @submit="(e) => onSubmit(e)" class="bg-white sm:rounded-lg p-4">
      <div class="flex flex-row">
        <div class="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 sm:pr-2 md:pr-2 lg:pr-4">
          <Input
            class="mb-3 "
            :label="$t('ticker')"
            :placeholder="`${$t('actions.add')} DOGE`"
            :value="coin"
            v-model="coin"
            :loading="loading"
            :disabled="loading"
          />
          <div class="relative">
            <Button
              size="lg"
              variant="primary"
              type="submit"
              :disabled="loading || !canSubmit"
            >
              {{ $t('actions.add') }}
            </Button>

            <VueFeather
              type="settings"
              class="absolute top-3 right-3 z-10 text-gray-400 active:text-gray-500 transition-all duration-100 ease-out cursor-pointer"
              @click="toggleSettings"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
