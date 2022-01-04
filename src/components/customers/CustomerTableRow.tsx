import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Customer } from '../../types';
import { ROUTES } from '../../enums';

import styles from './CustomerTableRow.module.scss';

const T_PATH = 'components.customers.CustomerTableRow';

interface IProps {
  customer: Customer | undefined;
}

const CustomerTableRow = ({ customer }: IProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.customerTableRow}>
      <div className={cx(`${styles.customerTableCell} ${styles.nameCell}`)}>
        <Link to={`/${ROUTES.CUSTOMERS}/${customer?.id}`}>
          <span className="hiddenFromScreen">{t(`${T_PATH}.customer`)}:</span>
          {customer?.fullName}
        </Link>
      </div>
      <div className={styles.customerTableCell}>
        <span className="hiddenFromScreen">{t(`${T_PATH}.nin`)}:</span>
        {customer?.nin}
      </div>
      <div className={styles.customerTableCell}>
        <span className="hiddenFromScreen">{t(`${T_PATH}.email`)}:</span>
        {customer?.email}
      </div>
      <div className={styles.customerTableCell}>
        <span className="hiddenFromScreen">{t(`${T_PATH}.phone`)}:</span>
        {customer?.phone}
      </div>
      <div className={styles.customerTableCell}>
        <span className="hiddenFromScreen">{t(`${T_PATH}.project`)}:</span>
        {customer?.project}
      </div>
      <div className={styles.customerTableCell}>
        <span className="hiddenFromScreen">{t(`${T_PATH}.coApplicant`)}:</span>
        {customer?.coApplicant}
      </div>
    </div>
  );
};

export default CustomerTableRow;
