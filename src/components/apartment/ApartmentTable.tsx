import React from 'react';
import cx from 'classnames';
import { IconSortAscending, IconSortDescending } from 'hds-react';
import { useTranslation } from 'react-i18next';

import ApartmentRow from './ApartmentRow';
import SortApartments from './SortApartments';
import { Project } from '../../types';
import { useGetApartmentsByProjectQuery } from '../../redux/services/api';

import styles from './ApartmentTable.module.scss';

const T_PATH = 'components.apartment.ApartmentTable';

interface IProps {
  projectId: Project['id'];
  housingCompany: Project['housing_company'];
}

const ApartmentTable = ({ projectId, housingCompany }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: apartments, isLoading, isError, isSuccess } = useGetApartmentsByProjectQuery(projectId);
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
      aria-label={`${t(`${T_PATH}.'ariaApartmentListForProject'`)}: ${housingCompany}`}
    >
      <ul className={styles.apartmentListTable}>
        <li className={styles.apartmentListHeaders} aria-label={t(`${T_PATH}.ariaSortApartments`)}>
          <div className={cx(styles.headerCell, styles.headerCellSortable, styles.headerCellApartment)}>
            {tableHeadButton('apartment_number', t(`${T_PATH}.apartment`), true)}
          </div>
          <div className={cx(styles.headerCell, styles.headerCellSortable, styles.headerCellNarrow)}>
            {tableHeadButton('floor', t(`${T_PATH}.floor`), false)}
          </div>
          <div className={cx(styles.headerCell, styles.headerCellSortable, styles.headerCellNarrow)}>
            {tableHeadButton('living_area', t(`${T_PATH}.area`), false)}
          </div>
          <div className={cx(styles.headerCell, styles.headerCellWide)} style={{ textAlign: 'right' }}>
            {t(`${T_PATH}.applicants`)}
          </div>
        </li>
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error while loading apartments</li>}
        {sortedApartments &&
          sortedApartments.map((apartment) => <ApartmentRow key={apartment.uuid} apartment={apartment} />)}
      </ul>
    </div>
  );
};

export default ApartmentTable;
