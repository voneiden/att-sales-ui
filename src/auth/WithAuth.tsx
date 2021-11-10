import React from 'react';

import { Client } from './index';
import { useClient } from './hooks';

export type WithAuthChildProps = { client: Client };

const WithAuth = (
  AuthorizedContent: React.ComponentType<WithAuthChildProps>,
  UnAuthorizedContent: React.ComponentType<WithAuthChildProps>,
  InitializingContent?: React.ComponentType<unknown>
): React.ReactElement => {
  const client = useClient();
  const isInitialized = client.isInitialized();
  const authenticated = client.isAuthenticated();

  if (InitializingContent && !isInitialized) {
    return <InitializingContent />;
  }

  return authenticated ? <AuthorizedContent client={client} /> : <UnAuthorizedContent client={client} />;
};

export default WithAuth;
