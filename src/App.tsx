import React from 'react';
import { useTranslation } from 'react-i18next';

import NavBar from './common/navbar/NavBar';

const App = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <NavBar />
      <div id="content">
        <h1>{t('welcome')}</h1>
      </div>
    </>
  );
};

export default App;
