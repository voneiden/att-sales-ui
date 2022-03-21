import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fi from './fi.json';
import en from './en.json';

export const LOCALSTORAGE_LANG_KEY = 'currentLang';

const getLang = () => {
  const stored = localStorage.getItem(LOCALSTORAGE_LANG_KEY);
  return stored !== null && stored !== undefined ? JSON.parse(stored) : 'fi';
};

i18n.use(initReactI18next).init({
  lng: getLang(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    fi: {
      translation: fi,
    },
    en: {
      translation: en,
    },
  },
});

export default i18n;
