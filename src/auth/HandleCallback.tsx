import React from 'react';
import { useLocation } from 'react-router-dom';

import OidcCallback from './OidcCallback';
import { isCallbackUrl } from './index';
import { getClient } from './oidc-react';
import { ROUTES } from '../enums';

const HandleCallback = (props: React.PropsWithChildren<unknown>): React.ReactElement => {
  const { children } = props;
  const location = useLocation();
  const client = getClient();
  const authenticated = client.isAuthenticated();
  const isCallBack = isCallbackUrl(location.pathname);

  if (!authenticated && isCallBack) {
    return <OidcCallback successRedirect={ROUTES.INDEX} failureRedirect={ROUTES.AUTH_ERROR} />;
  }

  return <>{children}</>;
};

export default HandleCallback;
