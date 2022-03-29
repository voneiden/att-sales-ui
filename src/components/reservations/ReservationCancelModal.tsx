import React, { useState } from 'react';
import { Button, Dialog, IconInfoCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import ReservationCancelForm from './ReservationCancelForm';
import sortReservationApplicants from '../../utils/sortReservationApplicants';
import { RootState } from '../../redux/store';
import { toast } from '../common/toast/ToastManager';
import { hideReservationCancelModal } from '../../redux/features/reservationCancelModalSlice';
import { ReservationCancelFormData } from '../../types';

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

  const handleFormCallback = (formData: ReservationCancelFormData) => {
    setIsLoading(true);
    console.log(formData); // TODO: Add operations here
    setIsLoading(false);
    closeDialog();
  };

  const sortedApplicants = sortReservationApplicants(reservation.applicants);

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
            {sortedApplicants.map((applicant, index) => {
              if (index === 0) {
                return `${applicant.last_name}, ${applicant.first_name}`;
              }
              return ` (${applicant.last_name}, ${applicant.first_name})`;
            })}
          </div>
        </div>
        <ReservationCancelForm
          reservation={reservation}
          ownershipType={ownershipType}
          handleFormCallback={handleFormCallback}
        />
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button variant="primary" type="submit" form={`reservation-cancel-form-${reservation.id}`} disabled={isLoading}>
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
