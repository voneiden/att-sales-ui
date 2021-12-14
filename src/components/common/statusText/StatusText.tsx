import React from 'react';

import styles from './StatusText.module.scss';

const StatusText: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <p className={styles.statusText}>{children}</p>
);

export default StatusText;
