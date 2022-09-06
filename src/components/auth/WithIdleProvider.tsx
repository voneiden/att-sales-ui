import React, { FC } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';
import { useDispatch } from 'react-redux';

import { getClient } from '../../auth/oidc-react';
import {
  hideAuthSessionExpiringModal,
  showAuthSessionExpiringModal,
} from '../../redux/features/authSessionExpiringModalSlice';

export const TIMEOUT_MINUTES = process.env.REACT_APP_IDLE_TIMEOUT_MINUTES || '15';

const IdleTimer: FC<unknown> = ({ children }) => {
  const client = getClient();
  const dispatch = useDispatch();

  const onPrompt = (): void => {
    dispatch(showAuthSessionExpiringModal());
  };

  const onIdle = (): void => {
    dispatch(hideAuthSessionExpiringModal());
    client.logout();
  };

  return (
    <IdleTimerProvider
      timeout={1000 * 60 * parseInt(TIMEOUT_MINUTES)}
      onPrompt={onPrompt}
      onIdle={onIdle}
      promptTimeout={1000 * 60}
      name="att-sales-ui-idle-timer"
      startOnMount
      crossTab
    >
      {children}
    </IdleTimerProvider>
  );
};

export default IdleTimer;
