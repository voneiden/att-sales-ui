import React, { useState } from 'react';
import { Navigation } from 'hds-react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';

const T_PATH = 'common.navbar.Navbar';
const LANGUAGES = ['fi', 'en', 'sv'];

const isActiveLink = (path: string, currentPath: string): boolean => !!matchPath({ path, end: false }, currentPath);

const NavBar = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [language, setLang] = useState<string>(LANGUAGES[0]);

  const setLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLang(code);
  };

  const navLinks = [
    {
      path: ROUTES.INDEX,
      label: t(`${T_PATH}.homepage`),
    },
  ];

  return (
    <Navigation
      title={t(`${T_PATH}.title`)}
      menuToggleAriaLabel="menu"
      skipTo="#content"
      skipToContentLabel={t(`${T_PATH}.skipToContent`)}
    >
      <Navigation.Row variant="inline">
        {navLinks.map(({ path, label }) => (
          <Navigation.Item key={path} href={path} label={label} active={isActiveLink(path, location.pathname)} />
        ))}
      </Navigation.Row>
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
