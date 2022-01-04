import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconSortAscending, IconSortDescending } from 'hds-react';

import CustomerTableRow from './CustomerTableRow';
import StatusText from '../../components/common/statusText/StatusText';
import useSessionStorage from '../../utils/useSessionStorage';
import { Customer } from '../../types';
import { sortAlphanumeric } from '../../utils/sortList';

import styles from './CustomerTable.module.scss';

const T_PATH = 'components.customers.CustomerTable';

interface IProps {
  customers: Customer[] | undefined;
  hasSearchQuery: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const CustomerTable = ({ customers, hasSearchQuery, isLoading, isSuccess }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const [sortDirection, setSortDirection] = useSessionStorage({
    defaultValue: 'ascending',
    key: 'customerTableSort',
  });
  const sortedCustomers = sortAlphanumeric(customers ? customers : [], 'fullName', sortDirection) as Customer[];

  const requestSort = () => {
    if (sortDirection === 'ascending') {
      setSortDirection('descending');
    } else {
      setSortDirection('ascending');
    }
  };

  const apartmentSortClasses = () => {
    return cx(styles.sortButton, styles.activeSort, {
      [styles.ascending]: sortDirection === 'ascending',
      [styles.descending]: sortDirection === 'descending',
    });
  };

  const getSortIcon = (key: string) => {
    if (sortDirection === 'descending') {
      return <IconSortDescending aria-label={t(`${T_PATH}.ariaDescending`)} className={styles.sortArrow} />;
    }
    return <IconSortAscending aria-label={t(`${T_PATH}.ariaAscending`)} className={styles.sortArrow} />;
  };

  const renderTableHeaders = () => (
    <div className={styles.customerTableHeader}>
      <div className={cx(styles.customerTableHeaderCell, styles.customerTableHeaderCellButton)}>
        <button data-testid="sortButton" type="button" onClick={() => requestSort()} className={apartmentSortClasses()}>
          <span>{t(`${T_PATH}.customer`)}</span>
          {getSortIcon('lastName')}
        </button>
      </div>
      <div className={styles.customerTableHeaderCell}>{t(`${T_PATH}.nin`)}</div>
      <div className={styles.customerTableHeaderCell}>{t(`${T_PATH}.email`)}</div>
      <div className={styles.customerTableHeaderCell}>{t(`${T_PATH}.phone`)}</div>
      <div className={styles.customerTableHeaderCell}>{t(`${T_PATH}.project`)}</div>
      <div className={styles.customerTableHeaderCell}>{t(`${T_PATH}.coApplicant`)}</div>
    </div>
  );

  return (
    <>
      <div className={styles.customerTableWrapper}>
        <div className={styles.customerTable}>
          {renderTableHeaders()}
          {hasSearchQuery &&
            !isLoading &&
            sortedCustomers &&
            !!sortedCustomers.length &&
            sortedCustomers.map((c) => <CustomerTableRow key={c.id} customer={c} />)}
        </div>
      </div>
      {!hasSearchQuery && (
        <div className={styles.messageWrapper}>
          <StatusText>{t(`${T_PATH}.noSearchQuery`)}</StatusText>
        </div>
      )}
      {hasSearchQuery && isLoading && (
        <div className={styles.messageWrapper}>
          <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>
        </div>
      )}
      {hasSearchQuery && !isLoading && (!sortedCustomers || sortedCustomers?.length === 0) && (
        <div className={styles.messageWrapper}>
          <StatusText>{t(`${T_PATH}.noResults`)}</StatusText>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
