import $axios from "@/services/$axios";

const CURRENCY = import.meta.env.VITE_CURRENCY;

export const cryptocompareApi = {
  /**
   * Get csrf cookie
   */
  getSingleSymbolPrice: (coin: string): Promise<any> => {
    const params = {
      fsym: coin,
      tsyms: CURRENCY,
    }
    const url = `/data/price`;
    return $axios.get(url, {params});
  },

  /**
   * Get csrf cookie
   */
  getMultipleSymbolsData: (coin: string): Promise<any> => {
    const params = {
      fsyms: coin,
      tsyms: CURRENCY,
    }
    const url = `/data/pricemultifull`;
    return $axios.get(url, {params});
  },

  getAllCoins: (): Promise<any> => {
    const url = `/data/all/coinlist`;
    return $axios.get(url);
  },
}

export default cryptocompareApi;
