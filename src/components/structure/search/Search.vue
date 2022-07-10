<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue';
  import { useI18n } from "vue-i18n";
  import VueFeather from 'vue-feather';

  // Components
  import { Input } from '@/components/ui';

  // Stores
  import { useTickerStore } from '@/stores/ticker';

  const { t } = useI18n();
  const { search } = storeToRefs(useTickerStore());
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-4 px-4 sm:pt-0">
    <Input
      :placeholder="$t('find_ticker')"
      v-model="search"
    >
      <template v-slot:prepend>
        <VueFeather type="search" size="20" class="align-top mr-2 mt-0.5 text-gray-400" />
      </template>
    </Input>
  </div>
</template>
