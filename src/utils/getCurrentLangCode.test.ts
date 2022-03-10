import i18n from '../i18n/i18n';
import { getCurrentLangCode } from './getCurrentLangCode';

describe('getCurrentLangCode', () => {
  test('returns fi', () => {
    i18n.language = 'fi';
    expect(getCurrentLangCode()).toEqual('fi');
  });

  test('returns en', () => {
    i18n.language = 'en';
    expect(getCurrentLangCode()).toEqual('en');
  });

  test('returns sv', () => {
    i18n.language = 'sv';
    expect(getCurrentLangCode()).toEqual('sv');
  });
});
