import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { IconAngleDown, IconAngleUp } from 'hds-react';
import { useTranslation } from 'react-i18next';

import formattedLivingArea from '../../utils/formatLivingArea';
import useSessionStorage from '../../utils/useSessionStorage';
import { Apartment } from '../../types';
import { fullURL } from '../../utils/fullURL';

import styles from './ApartmentRow.module.scss';

const BREAK_POINT = 768;
const T_PATH = 'components.apartment.ApartmentRow';

interface IProps {
  apartment: Apartment;
}

const ApartmentRow = ({ apartment }: IProps): JSX.Element => {
  const { apartment_number, apartment_structure, living_area, nid, url } = apartment;

  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [rowOpen, setRowOpen] = useSessionStorage({ defaultValue: false, key: `apartmentRowOpen-${nid}` });

  const isDesktopSize = width > BREAK_POINT;
  const isMobileSize = width <= BREAK_POINT;

  const handleResize = () => setWidth(window.innerWidth);

  const toggleRow = () => isMobileSize && setRowOpen(!rowOpen);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const apartmentRowBaseDetails = (
    <>
      <strong>
        <span className="hiddenFromScreen">{t(`${T_PATH}.apartment`)}: </span>
        <a href={fullURL(url)}>{apartment_number}</a>
      </strong>
      <span>
        <span className="hiddenFromScreen">{t(`${T_PATH}.ariaApartmentStructure`)}: </span>
        {apartment_structure}{' '}
        {living_area && <span style={{ color: 'var(--color-black-60)' }}>({formattedLivingArea(living_area)})</span>}
      </span>
      {isMobileSize &&
        (rowOpen ? (
          <IconAngleUp style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
        ) : (
          <IconAngleDown style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
        ))}
    </>
  );

  const apartMentRowOtherDetails = (
    <div>
      <span className={isDesktopSize ? 'hiddenFromScreen' : styles.cellMobileTitle}>
        {t(`${T_PATH}.applicants`)}&nbsp;{' '}
      </span>
      <span>{/* TODO: show applicant data here */}-</span>
    </div>
  );

  return (
    <li className={styles.apartmentTableRow}>
      {isMobileSize ? (
        <>
          <button
            className={styles.apartmentCellMobile}
            onClick={toggleRow}
            aria-controls={`apartment-row-details-${nid}`}
            aria-expanded={rowOpen ? true : false}
          >
            {apartmentRowBaseDetails}
          </button>
          <div
            className={rowOpen ? cx(styles.mobileCells, styles.open) : styles.mobileCells}
            id={`apartment-row-details-${nid}`}
          >
            {apartMentRowOtherDetails}
          </div>
        </>
      ) : (
        <>
          <div className={cx(styles.cell, styles.apartmentCell)}>{apartmentRowBaseDetails}</div>
          <div className={styles.cell} style={{ textAlign: 'right' }}>
            {apartMentRowOtherDetails}
          </div>
        </>
      )}
    </li>
  );
};

export default ApartmentRow;
