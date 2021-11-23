import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../components/common/container/Container';

const T_PATH = 'pages.NotFound';

const NotFound = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Container>
      <h1>404 &ndash; {t(`${T_PATH}.pageNotFound`)}</h1>
    </Container>
  );
};

export default NotFound;
