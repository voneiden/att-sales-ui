import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'hds-react';

const T_PATH = 'common.navbar.Navbar';
const LANGUAGES = ['fi', 'en', 'sv'];

const NavBar = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [language, setLang] = useState<string>(LANGUAGES[0]);
  const setLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLang(code);
  };

  return (
    <Navigation
      title={t(`${T_PATH}.title`)}
      menuToggleAriaLabel="menu"
      skipTo="#content"
      skipToContentLabel={t(`${T_PATH}.skipToContent`)}
    >
      <Navigation.Actions>
        <Navigation.LanguageSelector label={language.toUpperCase()}>
          {LANGUAGES.map((lang) => (
            <Navigation.Item
              key={lang}
              label={t(`${T_PATH}.lang.${lang}`)}
              lang={lang}
              onClick={(): void => setLanguage(lang)}
            />
          ))}
        </Navigation.LanguageSelector>
      </Navigation.Actions>
    </Navigation>
  );
};

export default NavBar;
