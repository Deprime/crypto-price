/**
 * HTTP service
 */
// import axios, { type AxiosRequestConfig } from "axios";
import axios from "axios";

// Config
const APIKEY   = import.meta.env.VITE_CRYPTOAPI_KEY;
const DOMAIN   = import.meta.env.VITE_CRYPTOAPI_DOMAIN;
const DEV_MODE = import.meta.env.DEV;

// Create a instance of axios
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${DOMAIN}`
});

/**
 * Pre config of axios request
 */
$axios.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers.Authorization = `Apikey ${APIKEY}`;
  }
  return config;
});

/**
 * Pre config of axios response
 */
$axios.interceptors.response.use((response) =>
  response,
  async (error) => {
    if (DEV_MODE) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

export default $axios;
