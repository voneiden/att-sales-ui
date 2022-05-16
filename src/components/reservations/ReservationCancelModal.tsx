import React, { useState } from 'react';
import { Button, Dialog, IconInfoCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import ReservationCancelForm from './ReservationCancelForm';
import { RootState } from '../../redux/store';
import { toast } from '../common/toast/ToastManager';
import { hideReservationCancelModal } from '../../redux/features/reservationCancelModalSlice';
import { ReservationCancelFormData } from '../../types';
import { useCancelApartmentReservationMutation } from '../../redux/services/api';

import styles from './ReservationModal.module.scss';

const T_PATH = 'components.reservations.ReservationCancelModal';

const ReservationCancelModal = (): JSX.Element | null => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationCancelModal = useSelector((state: RootState) => state.reservationCancelModal);
  const isDialogOpen = reservationCancelModal.isOpened;
  const reservation = reservationCancelModal.content?.reservation;
  const ownershipType = reservationCancelModal.content?.ownershipType;
  const [isLoading, setIsLoading] = useState(false);
  const [cancelApartmentReservation, { isLoading: postReservationCancelLoading }] =
    useCancelApartmentReservationMutation();

  // Project uuid is used to refetch project data (including reservations) after cancelling a reservation
  const projectId = reservationCancelModal.content?.projectId || '';

  if (!isDialogOpen) return null;

  if (!reservation || !ownershipType) {
    toast.show({
      type: 'error',
      title: t(`${T_PATH}.errorTitle`),
      content: t(`${T_PATH}.noReservationOrOwnershipType`),
    });

    return null;
  }

  const closeDialog = () => dispatch(hideReservationCancelModal());

  const handleFormCallback = async (formData: ReservationCancelFormData) => {
    if (!postReservationCancelLoading) {
      setIsLoading(true);

      try {
        // Send reservation cancel form data to API
        await cancelApartmentReservation({ formData, reservationId: reservation.id, projectId: projectId })
          .unwrap()
          .then(() => {
            toast.show({ type: 'success', content: t(`${T_PATH}.cancelledSuccessfully`) });
            setIsLoading(false);
            closeDialog();
          });
      } catch (err: any) {
        toast.show({ type: 'error' });
        console.error(err);
        setIsLoading(false);
      }
    }
  };

  const formId = `reservation-cancel-form-${reservation.id}`;

  return (
    <Dialog
      id={`reservation-cancel-dialog-${reservation.id}`}
      aria-labelledby="reservation-cancel-dialog-header"
      isOpen={isDialogOpen}
      close={closeDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
    >
      <Dialog.Header
        id="reservation-cancel-dialog-header"
        title={t(`${T_PATH}.cancelReservation`)}
        iconLeft={<IconInfoCircle aria-hidden />}
      />
      <Dialog.Content>
        <div className={styles.customer}>
          {t(`${T_PATH}.cancelingForCustomer`)}:
          <div className={styles.applicants}>
            {reservation.customer.primary_profile.last_name} {reservation.customer.primary_profile.first_name}
            {reservation.customer.secondary_profile &&
              ` (${reservation.customer.secondary_profile.last_name}, ${reservation.customer.secondary_profile.first_name})`}
          </div>
        </div>
        <ReservationCancelForm ownershipType={ownershipType} handleFormCallback={handleFormCallback} formId={formId} />
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button variant="primary" type="submit" form={formId} disabled={isLoading}>
          {t(`${T_PATH}.cancelReservation`)}
        </Button>
        <Button variant="secondary" onClick={() => closeDialog()}>
          {t(`${T_PATH}.close`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ReservationCancelModal;
