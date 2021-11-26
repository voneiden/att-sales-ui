import React, { FC } from 'react';

import { Client, ClientConfig } from '../../auth/index';
import { useClient } from '../../auth/hooks';

export interface ClientContextProps {
  readonly client: Client;
}

export const ClientContext = React.createContext<ClientContextProps | null>(null);

export const ClientProvider: FC<Partial<ClientConfig>> = ({ children }) => {
  const client = useClient();
  return <ClientContext.Provider value={{ client }}>{children}</ClientContext.Provider>;
};
