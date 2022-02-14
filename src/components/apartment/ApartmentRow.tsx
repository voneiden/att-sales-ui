import React from 'react';
import cx from 'classnames';
import { IconAngleDown, IconAngleRight, IconGroup } from 'hds-react';
import { useTranslation } from 'react-i18next';

import formattedLivingArea from '../../utils/formatLivingArea';
import useSessionStorage from '../../utils/useSessionStorage';
import { Apartment, Project } from '../../types';
import { fullURL } from '../../utils/fullURL';

import styles from './ApartmentRow.module.scss';

const T_PATH = 'components.apartment.ApartmentRow';

interface IProps {
  apartment: Apartment;
  ownershipType: Project['ownership_type'];
}

const ApartmentRow = ({ apartment, ownershipType }: IProps): JSX.Element => {
  const { apartment_number, apartment_structure, living_area, reservations, url, apartment_uuid } = apartment;
  const [rowOpen, setRowOpen] = useSessionStorage({ defaultValue: false, key: `apartmentRowOpen-${apartment_uuid}` });
  const { t } = useTranslation();

  const toggleRow = () => setRowOpen(!rowOpen);

  const apartmentRowBaseDetails = (
    <>
      <strong>
        <span className="hiddenFromScreen">{t(`${T_PATH}.apartment`)}: </span>
        {apartment_number}
      </strong>
      <span>
        <span className="hiddenFromScreen">{t(`${T_PATH}.ariaApartmentStructure`)}: </span>
        {apartment_structure}{' '}
        {living_area && <span className={styles.apartmentLivingArea}>({formattedLivingArea(living_area)})</span>}
      </span>
    </>
  );

  const renderReservationCountText = () => {
    if (!reservations || reservations.length === 0) {
      return <span className={styles.textMuted}>{t(`${T_PATH}.noReservations`)}</span>;
    }
    return <span>{t(`${T_PATH}.reservations`, { count: reservations.length })}</span>;
  };

  const renderReservations = (
    <div className={cx(styles.cell, styles.buttonCell, rowOpen && styles.open)}>
      <button
        className={cx(styles.rowToggleButton, rowOpen && styles.open)}
        onClick={toggleRow}
        aria-controls={`apartment-row-${apartment_uuid}`}
        aria-expanded={!!reservations.length && rowOpen ? true : false}
        disabled={!reservations.length}
      >
        {renderReservationCountText()}
        {!!reservations.length && (rowOpen ? <IconAngleDown /> : <IconAngleRight />)}
      </button>

      <div
        className={rowOpen ? cx(styles.toggleContent, styles.open) : styles.toggleContent}
        id={`apartment-row-${apartment_uuid}`}
      >
        {reservations.map((reservation) => (
          <div className={styles.singleReservation} key={reservation.id}>
            <div className={styles.singleReservationColumn}>
              {reservation.applicants &&
                reservation.applicants.map((applicant) => (
                  <div key={applicant.ssn}>
                    {applicant.first_name} {applicant.last_name}
                  </div>
                ))}
            </div>
            <div className={styles.singleReservationColumn}>
              {ownershipType === 'haso' ? (
                <span>{reservation.right_of_residence}</span>
              ) : (
                reservation.has_children && <IconGroup />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.apartmentTableRow}>
      <div className={cx(styles.cell, styles.apartmentCell)}>
        {url ? (
          <a href={fullURL(url)} target="_blank" rel="noreferrer" className={styles.apartmentLink}>
            {apartmentRowBaseDetails}
          </a>
        ) : (
          <>{apartmentRowBaseDetails}</>
        )}
      </div>
      {renderReservations}
    </div>
  );
};

export default ApartmentRow;
