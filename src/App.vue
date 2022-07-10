<script setup lang="ts">
  import './App.scss';

  import { storeToRefs } from 'pinia'

  // Components
  import { Header, Search, Dashboard, Footer, Settings } from '@/components/structure';

  // Stores
  import { useTickerStore } from '@/stores/ticker';
  import { useSettingsStore } from '@/stores/settings';

  const { list, tickerList, perPage } = storeToRefs(useTickerStore());
  const { visible } = storeToRefs(useSettingsStore());
</script>

<template>
  <Header />
  <template v-if="list.length > 0">
    <Search />
  </template>

  <main class="pb-[90px]">
    <Dashboard />
    <Footer v-if="tickerList.length > perPage" />
  </main>

  <Settings v-show="visible" />
</template>
