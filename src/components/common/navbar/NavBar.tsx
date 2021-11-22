import React, { useState } from 'react';
import { IconSignout, Navigation } from 'hds-react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../enums';
import { useClient } from '../../../auth/hooks';

const T_PATH = 'common.navbar.Navbar';
const LANGUAGES = ['fi', 'en', 'sv'];

const isActiveLink = (path: string, currentPath: string): boolean => !!matchPath({ path, end: false }, currentPath);

const NavBar = (): JSX.Element => {
  const client = useClient();
  const authenticated = client.isAuthenticated();
  const initialized = client.isInitialized();
  const user = client.getUser();
  const location = useLocation();
  const { t, i18n } = useTranslation();
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
      menuToggleAriaLabel="menu"
      title={t(`${T_PATH}.title`)}
      titleUrl={ROUTES.INDEX}
      skipTo="#mainContent"
      skipToContentLabel={t(`${T_PATH}.skipToContent`)}
    >
      {initialized && authenticated && (
        <Navigation.Row variant="inline">
          {navLinks.map(({ path, label }) => (
            <Navigation.Item key={path} href={path} label={label} active={isActiveLink(path, location.pathname)} />
          ))}
        </Navigation.Row>
      )}
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
        {initialized && (
          <Navigation.User
            authenticated={authenticated}
            label={t(`${T_PATH}.login`)}
            onSignIn={(): void => client.login()}
            userName={user ? user.given_name : ''}
          >
            <Navigation.Item
              onClick={(): void => client.logout()}
              variant="supplementary"
              label={t(`${T_PATH}.logout`)}
              href={`/${ROUTES.LOGOUT}`}
              icon={<IconSignout aria-hidden />}
            />
          </Navigation.User>
        )}
      </Navigation.Actions>
    </Navigation>
  );
};

export default NavBar;
