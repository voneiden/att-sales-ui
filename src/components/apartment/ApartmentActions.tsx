import React from 'react';
import { Button, Select } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './ApartmentActions.module.scss';

const T_PATH = 'components.apartment.ApartmentActions';

const ApartmentActions = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.apartmentActions}>
      <Select label={t(`${T_PATH}.show`)} placeholder={t(`${T_PATH}.allApartments`)} options={[]} disabled />
      <div className={styles.action}>
        <p className={styles.actionLabel}>{t(`${T_PATH}.action`)}</p>
        <Button variant="secondary" disabled>
          {t(`${T_PATH}.createBuyerMailingList`)}
        </Button>
      </div>
    </div>
  );
};

export default ApartmentActions;
