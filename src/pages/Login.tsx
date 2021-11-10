import React from 'react';
import { Button, Card } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { getClientConfig } from '../auth/index';
import { useClient } from '../auth/hooks';
import NarrowContainer from '../components/common/narrowContainer/NarrowContainer';

const T_PATH = 'pages.Login';

const Login = (): JSX.Element | null => {
  const { t } = useTranslation();
  const currentConfig = getClientConfig();
  const { isAuthenticated, login } = useClient();

  const isLoggedIn = (): boolean => {
    if (!currentConfig) {
      return false;
    }
    return isAuthenticated();
  };

  return (
    <NarrowContainer>
      <Card style={{ textAlign: 'center' }}>
        <h1>{t(`${T_PATH}.loginTitle`)}</h1>
        {isLoggedIn() ? (
          <p>{t(`${T_PATH}.alreadyLoggedIn`)}</p>
        ) : (
          <Button onClick={() => login()}>{t(`${T_PATH}.login`)}</Button>
        )}
      </Card>
    </NarrowContainer>
  );
};

export default Login;
