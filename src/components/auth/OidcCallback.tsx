import React from 'react';
import { Card, LoadingSpinner } from 'hds-react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Container from '../common/container/Container';
import { useClientCallback } from '../../auth/hooks';

const T_PATH = 'auth.OidCallback';

export type OidcCallbackProps = {
  successRedirect: string;
  failureRedirect: string;
};

const OidcCallback = (props: OidcCallbackProps): JSX.Element => {
  const { t } = useTranslation();
  const client = useClientCallback();
  const initialized = client.isInitialized();
  const authenticated = client.isAuthenticated();

  if (!initialized) {
    return (
      <Container narrow>
        <Card style={{ marginTop: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <LoadingSpinner
              small
              style={{ marginRight: 10 }}
              loadingFinishedText={t(`${T_PATH}.ariaLoadingFinished`)}
              loadingText={t(`${T_PATH}.checkingLoginCredentials`)}
            />
            <span aria-hidden={true}>{t(`${T_PATH}.checkingLoginCredentials`)}...</span>
          </div>
        </Card>
      </Container>
    );
  }

  return authenticated ? <Navigate to={props.successRedirect} /> : <Navigate to={props.failureRedirect} />;
};

export default OidcCallback;
