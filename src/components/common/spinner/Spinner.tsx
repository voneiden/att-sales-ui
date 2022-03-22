import React from 'react';
import cx from 'classnames';
import { LoadingSpinner, LoadingSpinnerProps } from 'hds-react';

import i18n from '../../../i18n/i18n';

import styles from './Spinner.module.scss';

const T_PATH = 'components.common.spinner.Spinner';

type IProps = LoadingSpinnerProps & {
  spinnerClassName?: string;
};

const Spinner = ({
  className,
  multicolor,
  small,
  theme,
  loadingText = i18n.t(`${T_PATH}.loading`),
  loadingFinishedText = i18n.t(`${T_PATH}.loadingFinished`),
  valuenow,
  spinnerClassName,
}: IProps): JSX.Element => (
  <div className={cx(styles.spinnerWrap, className)}>
    <LoadingSpinner
      className={spinnerClassName}
      multicolor={multicolor}
      small={small}
      theme={theme}
      loadingText={loadingText}
      loadingFinishedText={loadingFinishedText}
      valuenow={valuenow}
    />
  </div>
);

export default Spinner;
