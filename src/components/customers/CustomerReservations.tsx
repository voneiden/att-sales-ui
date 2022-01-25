import React from 'react';
import { Button, IconArrowRight } from 'hds-react';
import { useTranslation } from 'react-i18next';

import ProjectName from '../project/ProjectName';
import formattedLivingArea from '../../utils/formatLivingArea';
import { Apartment } from '../../types';

import styles from './CustomerReservations.module.scss';

import dummyProjects from '../../mocks/projects.json'; // TODO: Get actual project data
import dummyApartments from '../../mocks/apartments.json'; // TODO: Get actual apartment data

const T_PATH = 'components.customers.CustomerReservations';

const dummyApartments1 = dummyApartments.slice(0, 2); // Get 1. and 2. for demo
const dummyApartments2 = dummyApartments.slice(2, 3); // Get 3. for demo

const CustomerReservations = () => {
  const { t } = useTranslation();

  const renderApartmentRow = (apartment: Apartment) => (
    <div className={styles.row}>
      <div className={styles.apartmentRow}>
        <div className={styles.apartmentRowLeft}>
          <div className={styles.apartmentStructure}>
            <span className={styles.emphasized}>{apartment.apartment_number}</span>
            <span>
              {apartment.apartment_structure} ({formattedLivingArea(apartment.living_area)})
            </span>
          </div>
          <div>1. {t(`${T_PATH}.position`)}</div>
          <div>{t(`${T_PATH}.priority`)}: 3</div>
        </div>
        <div className={styles.apartmentRowRight}>
          <div className={styles.offer}>
            <span className={styles.offerTitle}>{t(`${T_PATH}.offerDueDate`)}</span>{' '}
            <IconArrowRight className={styles.offerArrowIcon} size="xs" aria-hidden /> <span>DD.MM.YYYY</span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button variant="secondary" size="small" disabled>
          {t(`${T_PATH}.createOffer`)}
        </Button>
        <Button variant="secondary" size="small" disabled>
          {t(`${T_PATH}.createContract`)}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.singleProject}>
        <ProjectName project={dummyProjects[0] as any} />
        {!!dummyApartments1.length &&
          dummyApartments1.map((a: any) => (
            <div key={a.uuid} className={styles.singleApartment}>
              {renderApartmentRow(a)}
            </div>
          ))}
      </div>
      <div className={styles.singleProject}>
        <ProjectName project={dummyProjects[1] as any} />
        {!!dummyApartments2.length &&
          dummyApartments2.map((a: any) => (
            <div key={a.uuid} className={styles.singleApartment}>
              {renderApartmentRow(a)}
            </div>
          ))}
      </div>
    </>
  );
};

export default CustomerReservations;
