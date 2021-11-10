import React from 'react';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

const T_PATH = 'pages.AuthError';

const AuthError = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Notification label={t(`${T_PATH}.errorTitle`)} type="error">
      {t(`${T_PATH}.authError`)}
    </Notification>
  );
};

export default AuthError;
