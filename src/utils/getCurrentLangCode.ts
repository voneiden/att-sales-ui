import i18n from 'i18next';

export const getCurrentLangCode = () => {
  let locale: 'en' | 'fi' | 'sv';
  switch (i18n.language) {
    case 'en':
      locale = 'en';
      break;
    case 'sv':
      locale = 'sv';
      break;
    default:
      locale = 'fi';
  }
  return locale;
};
