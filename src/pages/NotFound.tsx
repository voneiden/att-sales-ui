import React from 'react';
import { useTranslation } from 'react-i18next';

const T_PATH = 'pages.NotFound';

const NotFound = (): React.ReactElement => {
  const { t } = useTranslation();
  return <h1>404 &ndash; {t(`${T_PATH}.pageNotFound`)}</h1>;
};

export default NotFound;
