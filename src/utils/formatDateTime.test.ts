import i18n from '../i18n/i18n';
import formatDateTime from './formatDateTime';

describe('formatDateTime', () => {
  const exampleDateTime = new Date(2021, 0, 1, 12, 0, 0, 0); // Jan 01 2021 12:00:00

  test('formats living area in Finnish', () => {
    i18n.language = 'fi';
    expect(formatDateTime(String(exampleDateTime))).toEqual('1.1.2021 klo 12.00');
  });

  test('formats living area in English', () => {
    i18n.language = 'en';
    expect(formatDateTime(String(exampleDateTime))).toEqual('Jan 1, 2021, 12:00 PM');
  });

  test('formats living area in Swedish', () => {
    i18n.language = 'sv';
    expect(formatDateTime(String(exampleDateTime))).toEqual('1 jan. 2021 12:00');
  });
});
