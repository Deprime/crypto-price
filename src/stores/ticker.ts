import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

import type { TickerType } from '@/types/ticker';

const CURRENCY = import.meta.env.VITE_CURRENCY;

// Api service
import tickerApi from '@/api/ticker';

export const useTickerStore = defineStore('ticker', {
  state: () => ({
    list:  useStorage('list', <TickerType[]>[]),
    activeTickerId: <string|null> null,
    activeTickerChart: <number[]>[],
    loading: false,
    search: <string|number> "",
    page: 1,
    perPage: 6,
    socket: null,
  }),

  getters: {
    tickerList: (state) => {
      let list = [...state.list];
      const search = state.search.toString().toUpperCase();

      if (search.length > 0) {
        state.activeTickerId = null;
        state.activeTickerChart = [];

        list = list.filter((ticker: TickerType) => {
          return ticker.id.includes(search);
        });
        state.page = 1;
      }

      return list;
    },
  },

  actions: {
    /**
     * Add ticker
     */
    async addTicker(tickerId: string) {
      const TID = tickerId.toUpperCase();
      const isTickerExists = this.list.find((ticker: TickerType) => ticker.id === TID);

      if (!isTickerExists) {
        this.loading = true;
        try {
          const { data } = await tickerApi.getPair(TID);
          if (data.USD) {
            const { USD } = data;
            const ticker: TickerType = {
              id: TID,
              title: TID,
              price: USD,
            }
            this.list.push(ticker);
            this.clearActiveState();
            return;
          }
        }
        catch (error: any) {
          throw new Error(error);
        }
        finally {
          this.loading = false
        }
      }
    },

    /**
     * Remove ticker
     */
    async removeTicker(tickerId: string) {
      const index = this.list.findIndex((ticker: TickerType) => ticker.id === tickerId);
      if (index !== -1) {
        if (this.activeTickerId === tickerId) {
          this.clearActiveState();
        }

        this.list = this.list.filter((ticker: TickerType) => ticker.id !== tickerId);

        if (this.getPaginatedList?.value?.length === 0 && this.tickerList?.value?.length > 0) {
          const prevPage = this.page.value - 1;
          this.setPage(prevPage);
        }
        await this.socketResubscribe();
      }
    },

    /**
     * Set tickr active
     */
    async setTickerActive(tickerId: string) {
      const ticker = this.list.find((ticker: TickerType) => ticker.id === tickerId);
      if (ticker) {
        this.activeTickerChart = [];
        this.activeTickerId = tickerId;
      }
    },

    /**
     * Set tickr active
     */
    async clearActiveState() {
      this.activeTickerId = null;
      this.activeTickerChart = [];
    },

    async setPage(page: number) {
      this.page = page;
      this.clearActiveState();
    },

    async setSocket(socket) {
      this.socket = socket;
    },

    async socketSubscribe() {
      const message = JSON.stringify({
        "action": "SubAdd",
        "subs": this.list.map(ticker => `2~Coinbase~${ticker.id}~${CURRENCY}`)
      });
      this.socket.send(message);
    },

    async socketUnsubscribe() {
      const message = JSON.stringify({
        "action": "SubAdd",
        "subs": this.list.map(ticker => `2~Coinbase~${ticker.id}~${CURRENCY}`)
      });
      this.socket.send(message);
    },

    async socketResubscribe() {
      await this.socketUnsubscribe();
      await this.socketSubscribe();
    },
  },
});
