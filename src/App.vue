<script setup lang="ts">
  import './App.scss';

  import { storeToRefs } from 'pinia'

  // Components
  import { Header, Search, Dashboard, Footer } from '@/components/structure';

  // Stores
  import { useTickerStore } from '@/stores/ticker';

  const { list, tickerList } = storeToRefs(useTickerStore())
</script>

<template>
  <Header />
  <template v-if="list.length > 0">
    <Search />
  </template>

  <main class="pb-[90px]">
    <Dashboard />
    <Footer v-if="tickerList.length > 6" />
  </main>
</template>
