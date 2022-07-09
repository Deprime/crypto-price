<script setup lang="ts">
  import { computed, onMounted, onBeforeUnmount, reactive, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import type { TickerType } from '@/types/ticker';

  // Stores
  import { useTickerStore } from '@/stores/ticker';

  // Components
  import { TickerCard, ActiveTickerChart } from '@/components/shared';

  const APIKEY = import.meta.env.VITE_CRYPTOAPI_KEY;

  const { tickerList, activeTickerId, activeTickerChart, page, perPage,  } = storeToRefs(useTickerStore())
  const { removeTicker, setTickerActive, clearActiveState, setSocket, socketSubscribe, socketUnsubscribe } = useTickerStore();
  let liveTickers = reactive({});
  const documentWidth = ref(0);

  // Computed
  const getPaginatedList = computed(() => {
    const list = tickerList.value;
    const start = (page.value - 1) * perPage.value;
    const end = page.value * perPage.value;
    return <TickerType[]>list.slice(start, end);
  });

  const isMobile = computed(() => documentWidth.value <= 640);

  // Methods
  const isLive = (tickerId) => typeof liveTickers[tickerId] !== 'undefined';
  /**
   * Toggle ticker
   */
  const toggleTicker = (tickerId: string) => {
    if (tickerId === activeTickerId.value) {
      clearActiveState();
    }
    else {
      setTickerActive(tickerId);
    }
  }

  /**
   *
   */
  const onResize = () => {
    documentWidth.value = document.body.clientWidth;
  }

  onMounted(async () => {
    window.addEventListener('resize', onResize);
    onResize();

    const ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?format=streamer&api_key=${APIKEY})`);

    ws.onmessage = function(event) {
      const data = event.data;
      const info = data.split('~');
      if (parseInt(info[0]) === 2 && [1,2].includes(parseInt(info[4])) && !isNaN(parseFloat(info[5]))) {
        const coin = info[2];
        const price = parseFloat(info[5]);
        const flag = parseFloat(info[4]);
        // liveTickers[coin] = price;
        liveTickers[coin] = {
          price,
          flag,
        };

        if (activeTickerId.value && activeTickerId.value === coin) {
          activeTickerChart.value.push(price);
        }
      }
    };

    ws.onopen = async function() {
      await socketSubscribe();
    };

    await setSocket(ws);
  });

  onBeforeUnmount(() => {
    socketUnsubscribe();
    window.removeEventListener('resize', onResize);
  });
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:bgrid-cols-5 gap-4 p-4">
    <div
      v-for="ticker in getPaginatedList"
      :key="`t-${ticker.id}`"
    >
      <TickerCard
        :id="ticker.id"
        :title="ticker.id"
        :price="liveTickers[ticker.id]?.price || ticker.price"
        :flag="liveTickers[ticker.id]?.flag || null"
        :image="ticker.image"
        :is-active="ticker.id === activeTickerId"
        :is-live="isLive(ticker.id)"
        @trash="removeTicker"
        @setActive="toggleTicker"
      />

      <div v-if="activeTickerId && ticker.id === activeTickerId  && isMobile" class="pt-4 sm:py-2 sm:px-4">
        <ActiveTickerChart />
      </div>
    </div>
  </section>

  <div v-if="activeTickerId && !isMobile" class="pt-4 sm:py-2 sm:px-4">
    <ActiveTickerChart />
  </div>
</template>
