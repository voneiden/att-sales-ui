import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LoadingScreen.module.scss';

const T_PATH = 'components.common.loadingScreen.LoadingScreen';

const LoadingScreen = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles['wrapper']}>
      <h1>{t(`${T_PATH}.loading`)}...</h1>
    </div>
  );
};

export default LoadingScreen;
