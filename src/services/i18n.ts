import { createI18n } from 'vue-i18n'

export const DEFAULT_LOCALE = "en";
const LOADED_LOCALES = [DEFAULT_LOCALE];
const LOCALE_FILE_URL = `/locales/{locale}.json`;
// const SUPPORTED_LOCALES = ["en", "ru"];

/**
 *
 * @param {String} lang
 */
export const createI18nInstance = (lang = DEFAULT_LOCALE) => {
  return createI18n({
    locale: lang, // set locale
    fallbackLocale: DEFAULT_LOCALE, // set fallback locale
    messages: {}
  });
}

/**
 *
 * @param i18n
 * @param {String} lang
 * @returns {Promise}
 * TODO: implement locale caching & changing
 */
export const loadLocale = async (i18n: any, lang = DEFAULT_LOCALE): Promise<any> => {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(i18n.global?.getLocaleMessage());
  }

  // If the language was already loaded
  // if (LOADED_LOCALES.includes(lang)) {
  //   return Promise.resolve(setI18nLanguage(i18n, lang))
  // }

  const url = LOCALE_FILE_URL.replace('{locale}', lang);
  return fetch(url)
    .then(response => response.json())
    .then((messages) => {
      LOADED_LOCALES.push(lang);
      return messages;
    });
}
