import { yupResolver } from '@hookform/resolvers/yup';
import { Button, IconAlertCircle, IconPen, Tooltip } from 'hds-react';
import moment from 'moment';
import React from 'react';
import { get, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { showApartmentRevaluationModal } from '../../redux/features/apartmentRevaluationModalSlice';

import { ApartmentReservationWithCustomer, ApartmentRevaluation, CostIndex } from '../../types';
import formattedCurrency from '../../utils/formatCurrency';
import formatDateTime from '../../utils/formatDateTime';
import { getCurrentLangCode } from '../../utils/getCurrentLangCode';

import '../costindex/CostIndexSingleTable.module.scss';
import styles from '../revaluation/ReservationRevaluationInfo.module.scss';

const T_PATH = 'components.revaluation.ReservationRevaluationInfo';

interface Props {
  reservationWithCustomer: ApartmentReservationWithCustomer;
}

const ReservationRevaluationInfo = ({ reservationWithCustomer }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const t = (label: string) => translate(`${T_PATH}.${label}`);
  const revaluation = reservationWithCustomer.revaluation;
  if (revaluation) {
    return (
      <div className={styles.revaluationInfoRow}>
        <span>
          {t('revaluationEdit')} {formatDateTime(revaluation.modified_at)}
        </span>
        <button
          onClick={() => {
            dispatch(
              showApartmentRevaluationModal({
                apartmentId: reservationWithCustomer.apartment_uuid,
                reservationId: reservationWithCustomer.id,
                customer: reservationWithCustomer.customer,
                revaluation: revaluation,
              })
            );
          }}
          className={styles.editButton}
        >
          <IconPen size="xs" />
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="supplementary"
      onClick={() => {
        dispatch(
          showApartmentRevaluationModal({
            apartmentId: reservationWithCustomer.apartment_uuid,
            reservationId: reservationWithCustomer.id,
            customer: reservationWithCustomer.customer,
          })
        );
      }}
      size="small"
      iconLeft={<IconAlertCircle />}
    >
      {t('buttonCreate')}
    </Button>
  );
};

export default ReservationRevaluationInfo;
