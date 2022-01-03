import React from 'react';
import cx from 'classnames';
import { IconSortAscending, IconSortDescending, Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import ApartmentRow from './ApartmentRow';
import SortApartments from './SortApartments';
import StatusText from '../common/statusText/StatusText';
import { Apartment, Project } from '../../types';

import styles from './ApartmentTable.module.scss';

const T_PATH = 'components.apartment.ApartmentTable';

interface IProps {
  apartments: Apartment[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  projectId: Project['id'];
  housingCompany: Project['housing_company'];
}

const ApartmentTable = ({
  apartments,
  isLoading,
  isError,
  isSuccess,
  projectId,
  housingCompany,
}: IProps): JSX.Element => {
  const { t } = useTranslation();
  const { sortedApartments, requestSort, sortConfig } = SortApartments(
    isSuccess && apartments ? apartments : [],
    `project-${projectId}`
  );

  const isCurrentlyActiveSort = (key: string) => {
    return sortConfig ? sortConfig.key === key : false;
  };

  const getSortDirectionFor = (name: string) => {
    if (!sortConfig) return;
    return sortConfig?.key === name ? sortConfig.direction : undefined;
  };

  const apartmentSortClasses = (key: string) => {
    return cx(styles.sortButton, {
      [styles.activeSort]: isCurrentlyActiveSort(key),
      [styles.ascending]: getSortDirectionFor(key) === 'ascending',
      [styles.descending]: getSortDirectionFor(key) === 'descending',
    });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig) return;
    if (getSortDirectionFor(key) === 'descending') {
      return <IconSortDescending aria-label={t(`${T_PATH}.ariaDescending`)} className={styles.sortArrow} />;
    }
    return <IconSortAscending aria-label={t(`${T_PATH}.ariaAscending`)} className={styles.sortArrow} />;
  };

  const tableHeadButton = (sortKey: string, buttonLabel: string, sortAsAlphaNumeric: boolean) => {
    return (
      <button
        type="button"
        onClick={() => requestSort(sortKey, sortAsAlphaNumeric)}
        className={apartmentSortClasses(sortKey)}
      >
        <span className="hiddenFromScreen">
          {isCurrentlyActiveSort(sortKey) ? t(`${T_PATH}.ariaIsActiveSort`) : t(`${T_PATH}.ariaSetSort`)},&nbsp;
        </span>
        <span>{buttonLabel}</span>
        {getSortIcon(sortKey)}
      </button>
    );
  };

  return (
    <div
      className={styles.apartmentList}
      role="group"
      aria-label={`${t(`${T_PATH}.ariaApartmentListForProject`)}: ${housingCompany}`}
    >
      <ul className={styles.apartmentListTable}>
        {isLoading ? (
          <li>
            <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>
          </li>
        ) : isError ? (
          <li>
            <Notification type="error" size="small" style={{ marginTop: 15 }}>
              {t(`${T_PATH}.errorLoadingApartments`)}
            </Notification>
          </li>
        ) : (
          <>
            <li className={styles.apartmentListHeaders} aria-label={t(`${T_PATH}.ariaSortApartments`)}>
              <div className={cx(styles.headerCell, styles.headerCellSortable, styles.headerCellApartment)}>
                {tableHeadButton('apartment_number', t(`${T_PATH}.apartment`), true)}
              </div>
              <div className={cx(styles.headerCell, styles.headerCellWide)} style={{ textAlign: 'right' }}>
                {t(`${T_PATH}.applicants`)}
              </div>
            </li>
            {sortedApartments &&
              sortedApartments.map((apartment) => <ApartmentRow key={apartment.uuid} apartment={apartment} />)}
          </>
        )}
      </ul>
    </div>
  );
};

export default ApartmentTable;
