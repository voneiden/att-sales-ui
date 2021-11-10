import React from 'react';
import { Card, LoadingSpinner } from 'hds-react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NarrowContainer from '../components/common/narrowContainer/NarrowContainer';
import { useClientCallback } from './hooks';

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
      <NarrowContainer>
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
      </NarrowContainer>
    );
  }

  return authenticated ? <Navigate to={props.successRedirect} /> : <Navigate to={props.failureRedirect} />;
};

export default OidcCallback;
