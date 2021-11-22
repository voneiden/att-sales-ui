import React from 'react';
import cx from 'classnames';

import styles from './Container.module.scss';

interface IProps {
  children: React.ReactElement;
  narrow?: boolean;
  wide?: boolean;
}

const Container = ({ children, narrow, wide }: IProps): JSX.Element => {
  const classes = cx([
    styles.container,
    {
      [styles.narrow]: narrow,
      [styles.wide]: wide,
    },
  ]);

  return <div className={classes}>{children}</div>;
};

export default Container;
