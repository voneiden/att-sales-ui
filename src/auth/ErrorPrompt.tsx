import React, { useState } from 'react';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { useClientErrorDetection, useClient } from './hooks';
import { ClientErrorObject, ClientError } from './index';

import styles from './ErrorPrompt.module.scss';

const T_PATH = 'auth.ErrorPrompt';

const ErrorPrompt = (props: React.PropsWithChildren<unknown>): React.ReactElement | null => {
  const [dismissedError, setDismissedError] = useState<ClientErrorObject>(undefined);
  const { t } = useTranslation();
  const newError = useClientErrorDetection();
  const client = useClient();
  const lastErrorType = dismissedError && dismissedError.type;
  const newErrorType = newError && newError.type;

  if (lastErrorType === newErrorType) {
    return null;
  }

  const sessionEndedElsewhere = newErrorType === ClientError.UNEXPECTED_AUTH_CHANGE;

  const notificationLabel = t(`${T_PATH}.notificationErrorTitle`);
  const notificationCloseButtonLabel = t(`${T_PATH}.notificationBtnClose`);

  const Prompt = (): React.ReactElement | null =>
    newError ? (
      <div className={styles['error-prompt-container']}>
        <div className={styles['error-prompt-content']}>
          <Notification
            label={notificationLabel}
            type="error"
            onClose={(): void => {
              setDismissedError(newError);
              if (sessionEndedElsewhere) {
                client.logout();
              }
            }}
            dismissible
            closeButtonLabelText={notificationCloseButtonLabel}
          >
            {sessionEndedElsewhere ? (
              <p>{t(`${T_PATH}.sessionEnded`)}</p>
            ) : (
              <>
                <p>
                  {t(`${T_PATH}.errorCode`)}: {newErrorType}.
                </p>
                <p>
                  {t(`${T_PATH}.errorMessage`)}: {newError.message || ''}
                </p>
              </>
            )}
          </Notification>
        </div>
        <div className={styles['error-prompt-overlay']} />
      </div>
    ) : null;

  return (
    <>
      {props.children}
      <Prompt />
    </>
  );
};

export default ErrorPrompt;
