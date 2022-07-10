import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18nInstance, loadLocale, DEFAULT_LOCALE } from './services/i18n';

const i18n = createI18nInstance();
// const htmlLocale = document?.querySelector('html')?.getAttribute('lang');

const htmlLocale = navigator?.language?.split("-")[0];
const locale = (!htmlLocale) ? DEFAULT_LOCALE : htmlLocale;

/**
 * Init default locale
 */
 async function initDefaultLocale(): Promise<any> {
  try {
    const messages = await loadLocale(i18n, locale);
    i18n.global.setLocaleMessage(DEFAULT_LOCALE, messages);
  }
  catch (error: any) {
    throw new Error(error);
  }
}

initDefaultLocale();

import App from './App.vue';
const app = createApp(App)

app.use(createPinia());
app.use(i18n);
app.mount('#app');
