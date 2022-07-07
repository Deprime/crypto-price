import $axios from "@/services/$axios";

const CURRENCY = import.meta.env.VITE_CURRENCY;

export const tickerApi = {
  /**
   * Get csrf cookie
   */
  getPair: (coin: string): Promise<any> => {
    const params = {
      fsym: coin,
      tsyms: CURRENCY,
    }
    const url = `/data/price`;
    return $axios.get(url, {params});
  },
}

export default tickerApi;
