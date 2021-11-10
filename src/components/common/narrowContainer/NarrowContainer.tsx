import React from 'react';

import styles from './NarrowContainer.module.scss';

const NarrowContainer: React.FC = ({ children }) => <div className={styles['narrow-container']}>{children}</div>;

export default NarrowContainer;
