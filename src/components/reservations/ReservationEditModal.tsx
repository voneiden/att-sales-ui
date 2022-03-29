import React, { useState } from 'react';
import { Button, Dialog, IconInfoCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import ReservationEditForm from './ReservationEditForm';
import sortReservationApplicants from '../../utils/sortReservationApplicants';
import { RootState } from '../../redux/store';
import { toast } from '../common/toast/ToastManager';
import { hideReservationEditModal } from '../../redux/features/reservationEditModalSlice';
import { ReservationEditFormData } from '../../types';

import styles from './ReservationModal.module.scss';

const T_PATH = 'components.reservations.ReservationEditModal';

const ReservationEditModal = (): JSX.Element | null => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationEditModal = useSelector((state: RootState) => state.reservationEditModal);
  const isDialogOpen = reservationEditModal.isOpened;
  const reservation = reservationEditModal.content?.reservation;
  const [isLoading, setIsLoading] = useState(false);

  if (!isDialogOpen) return null;

  if (!reservation) {
    toast.show({
      type: 'error',
      title: t(`${T_PATH}.errorTitle`),
      content: t(`${T_PATH}.noReservation`),
    });

    return null;
  }

  const closeDialog = () => dispatch(hideReservationEditModal());

  const handleFormCallback = (formData: ReservationEditFormData, isSubmitting: boolean) => {
    setIsLoading(isSubmitting);
    console.log(formData); // TODO: Add operations here
    setIsLoading(false);
    closeDialog();
  };

  const sortedApplicants = sortReservationApplicants(reservation.applicants);

  return (
    <Dialog
      id={`reservation-edit-dialog-${reservation.id}`}
      aria-labelledby="reservation-edit-dialog-header"
      isOpen={isDialogOpen}
      close={closeDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
    >
      <Dialog.Header
        id="reservation-edit-dialog-header"
        title={t(`${T_PATH}.reservationEdit`)}
        iconLeft={<IconInfoCircle aria-hidden />}
      />
      <Dialog.Content>
        <div className={styles.customer}>
          {t(`${T_PATH}.editingForCustomer`)}:
          <div className={styles.applicants}>
            {sortedApplicants.map((applicant, index) => {
              if (index === 0) {
                return `${applicant.last_name}, ${applicant.first_name}`;
              }
              return ` (${applicant.last_name}, ${applicant.first_name})`;
            })}
          </div>
        </div>
        <ReservationEditForm reservation={reservation} handleFormCallback={handleFormCallback} />
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button variant="primary" type="submit" form={`reservation-edit-form-${reservation.id}`} disabled={isLoading}>
          {t(`${T_PATH}.edit`)}
        </Button>
        <Button variant="secondary" onClick={() => closeDialog()}>
          {t(`${T_PATH}.cancel`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ReservationEditModal;
