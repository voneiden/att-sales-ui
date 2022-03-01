import React from 'react';
import { Button, IconDownload, Select } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './ApartmentActions.module.scss';
import { Project } from '../../types';

const T_PATH = 'components.apartment.ApartmentActions';

interface IProps {
  lotteryCompleted: Project['lottery_completed'];
}

const ApartmentActions = ({ lotteryCompleted }: IProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.apartmentActions}>
      <div className={styles.selectWrapper}>
        {lotteryCompleted && (
          <Select label={t(`${T_PATH}.show`)} placeholder={t(`${T_PATH}.allApartments`)} options={[]} />
        )}
      </div>
      <div>
        {lotteryCompleted ? (
          <>
            <span className={styles.action}>
              <Button variant="primary" iconRight={<IconDownload />} theme="black">
                {t(`${T_PATH}.createBuyerMailingList`)}
              </Button>
            </span>
            <span className={styles.action}>
              <Button variant="primary" iconRight={<IconDownload />} theme="black">
                {t(`${T_PATH}.downloadLotteryResults`)}
              </Button>
            </span>
          </>
        ) : (
          <span className={styles.action}>
            <Button variant="secondary" iconRight={<IconDownload />} theme="black">
              {t(`${T_PATH}.downloadApplicantList`)}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ApartmentActions;
