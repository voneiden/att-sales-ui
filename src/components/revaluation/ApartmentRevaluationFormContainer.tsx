import { Button, Dialog, Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { InstallmentTypes, ReservationCancelReasons } from '../../enums';
import {
  useGetApartmentHASOPaymentQuery,
  useGetApartmentReservationByIdQuery,
  useGetApartmentReservationsQuery,
  useGetCostIndexesQuery,
} from '../../redux/services/api';
import { ApartmentReservationCustomer, ApartmentRevaluation } from '../../types';
import Container from '../common/container/Container';
import Spinner from '../common/spinner/Spinner';
import ApartmentRevaluationForm from './ApartmentRevaluationForm';

import styles from './ApartmentRevaluationModal.module.scss';

const T_PATH = 'components.revaluation.ApartmentRevaluationModal';

interface Props {
  revaluation?: ApartmentRevaluation;
  reservationId: number;
  apartmentId: string;
  customer: ApartmentReservationCustomer;
  closeDialog: () => void;
  handleFormCallback: (arg0: ApartmentRevaluation) => void;
  isLoading: boolean;
}

const ApartmentRevaluationFormContainer = ({
  revaluation,
  reservationId,
  apartmentId,
  customer,
  closeDialog,
  handleFormCallback,
  isLoading,
}: Props): JSX.Element => {
  const { t: translate } = useTranslation();
  const t = (label: string) => translate(`${T_PATH}.${label}`);

  // Required fetches: cost indexes
  const { data: costIndexes, isLoading: costIndexesLoading, isError: costIndexesError } = useGetCostIndexesQuery();

  // If no revaluation is given, fetch also reservations and haso payment (original payment information)
  const {
    data: reservations,
    isLoading: reservationsLoading,
    isError: reservationsError,
  } = useGetApartmentReservationsQuery(apartmentId, { skip: !!revaluation });

  const {
    data: apartmentHASOPayment,
    isLoading: apartmentHASOPaymentLoading,
    isError: apartmentHASOPaymentError,
  } = useGetApartmentHASOPaymentQuery(apartmentId, { skip: !!revaluation });

  // Additionally in the latter case, we need payment details,
  // so the first terminated reservation must be fetched separately
  const firstTerminatedReservation = reservations?.find(
    (reservation) => reservation.cancellation_reason === ReservationCancelReasons.TERMINATED
  );
  // Fetch reservation data if no revaluation is given
  const {
    data: firstTerminatedReservationPayments,
    isLoading: firstTerminatedReservationPaymentsLoading,
    isError: firstTerminatedReservationPaymentsError,
  } = useGetApartmentReservationByIdQuery(firstTerminatedReservation ? firstTerminatedReservation.id : 0, {
    skip: !!revaluation || !firstTerminatedReservation,
  });

  const errorContainer = (
    <Container>
      {(costIndexesError || !costIndexes) && (
        <Dialog.Content>
          <Notification type="error" size="small" style={{ marginTop: 15 }}>
            {t('errorLoadingCostIndex')}
          </Notification>
        </Dialog.Content>
      )}
      {(apartmentHASOPaymentError || !apartmentHASOPayment) && (
        <Dialog.Content>
          <Notification type="error" size="small" style={{ marginTop: 15 }}>
            {t('errorLoadingApartmentPrice')}
          </Notification>
        </Dialog.Content>
      )}
      {(reservationsError || !reservations) && (
        <Dialog.Content>
          <Notification type="error" size="small" style={{ marginTop: 15 }}>
            {t('errorLoadingReservations')}
          </Notification>
        </Dialog.Content>
      )}
      <Dialog.ActionButtons>
        <Button variant="secondary" onClick={() => closeDialog()}>
          {t(`cancel`)}
        </Button>
      </Dialog.ActionButtons>
    </Container>
  );

  if (costIndexesLoading) {
    return <Spinner />;
  } else if (costIndexesError || !costIndexes) {
    return errorContainer;
  } else {
    if (revaluation) {
      return (
        <ApartmentRevaluationForm
          reservationId={reservationId}
          revaluation={revaluation}
          costIndexes={costIndexes}
          customer={customer}
          closeDialog={closeDialog}
          handleFormCallback={handleFormCallback}
          isLoading={isLoading}
        />
      );
    } else {
      if (firstTerminatedReservationPaymentsLoading || reservationsLoading || apartmentHASOPaymentLoading) {
        return <Spinner />;
      } else if (
        firstTerminatedReservationPaymentsError ||
        !firstTerminatedReservationPayments ||
        reservationsError ||
        !reservations ||
        apartmentHASOPaymentError ||
        !apartmentHASOPayment
      ) {
        return errorContainer;
      } else {
        // Determine original payment date
        const payment1 = firstTerminatedReservationPayments.installments.find(
          (installment) => installment.type === InstallmentTypes.Payment1
        );
        return (
          <ApartmentRevaluationForm
            reservationId={reservationId}
            newDefaults={{
              rightOfOccupancyPayment: apartmentHASOPayment.right_of_occupancy_payment,
              startDateISODefault: payment1?.due_date || null,
            }}
            costIndexes={costIndexes}
            customer={customer}
            closeDialog={closeDialog}
            handleFormCallback={handleFormCallback}
            isLoading={isLoading}
          />
        );
      }
    }
  }
};

export default ApartmentRevaluationFormContainer;
