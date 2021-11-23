import i18n from 'i18next';

export function envValueToBoolean(value: string | undefined | boolean, defaultValue: boolean): boolean {
  const strValue = String(value).toLowerCase();
  if (value === false || strValue === '' || strValue === 'false' || strValue === '0') {
    return false;
  }
  if (value === true || strValue === 'true' || strValue === '1') {
    return true;
  }
  return defaultValue;
}

export function formatDateTime(value: string) {
  let locale = '';

  switch (i18n.language) {
    case 'en':
      locale = 'en-US';
      break;
    case 'sv':
      locale = 'sv-FI';
      break;
    default:
      locale = 'fi-FI';
  }

  const formatted = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

  return formatted;
}
