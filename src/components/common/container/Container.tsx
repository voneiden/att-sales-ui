import React from 'react';
import cx from 'classnames';

import styles from './Container.module.scss';

type ContainerProps = React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>;
type IProps = ContainerProps & {
  narrow?: boolean;
  wide?: boolean;
};

const Container = ({ children, className, narrow, wide, ...rest }: IProps): JSX.Element => {
  const classes = cx([
    styles.container,
    className,
    {
      [styles.narrow]: narrow,
      [styles.wide]: wide,
    },
  ]);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Container;
