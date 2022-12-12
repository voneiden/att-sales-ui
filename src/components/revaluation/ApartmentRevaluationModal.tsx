import React, { useState } from 'react';
import { Button, Dialog, IconInfoCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { hideApartmentRevaluationModal } from '../../redux/features/apartmentRevaluationModalSlice';
import {
  useAddApartmentRevaluationMutation,
  useCancelApartmentReservationMutation,
  useUpdateApartmentRevaluationMutation,
} from '../../redux/services/api';

import { RootState } from '../../redux/store';
import { toast } from '../common/toast/ToastManager';
import { ApartmentRevaluation, ReservationCancelFormData } from '../../types';
import ApartmentRevaluationFormContainer from './ApartmentRevaluationFormContainer';

import styles from './ApartmentRevaluationModal.module.scss';

const T_PATH = 'components.revaluation.ApartmentRevaluationModal';

const ApartmentRevaluationModal = (): JSX.Element | null => {
  const { t: translate } = useTranslation();
  const t = (label: string) => translate(`${T_PATH}.${label}`);

  const dispatch = useDispatch();
  const apartmentRevaluationModal = useSelector((state: RootState) => state.apartmentRevaluationModal);
  const isDialogOpen = apartmentRevaluationModal.isOpened;
  const apartmentId = apartmentRevaluationModal.content?.apartmentId;
  const reservationId = apartmentRevaluationModal.content?.reservationId;
  const customer = apartmentRevaluationModal.content?.customer;
  const revaluation = apartmentRevaluationModal.content?.revaluation;

  const [isLoading, setIsLoading] = useState(false);
  const [addApartmentRevaluation, { isLoading: isAddApartmentRevaluationLoading }] =
    useAddApartmentRevaluationMutation(); // TODO error

  const [updateApartmentRevaluation, { isLoading: isUpdateApartmentRevaluationLoading }] =
    useUpdateApartmentRevaluationMutation(); // TODO error

  if (!isDialogOpen) return null;

  if (!apartmentId || !reservationId || !customer) {
    toast.show({
      type: 'error',
      title: t('errorTitle'),
      content: t('noReservationOrOwnershipType'), // TODO
    });

    return null;
  }

  const closeDialog = () => dispatch(hideApartmentRevaluationModal());

  const handleFormCallback = async (formData: ApartmentRevaluation) => {
    setIsLoading(true);
    try {
      // TODO
      if (revaluation) {
        await updateApartmentRevaluation({ formData, id: revaluation.id, apartmentId: apartmentId })
          .unwrap()
          .then(() => {
            toast.show({ type: 'success', content: t('revaluationUpdateSuccess') });
            setIsLoading(false);
            closeDialog();
          });
      } else {
        await addApartmentRevaluation({
          formData,
          apartmentId: apartmentId,
        })
          .unwrap()
          .then(() => {
            toast.show({ type: 'success', content: t('revaluationAddSuccess') });
            setIsLoading(false);
            closeDialog();
          });
      }
    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      id={`apartment-revaluation-dialog-${reservationId}`}
      aria-labelledby="apartment-revaluation-dialog-header"
      isOpen={isDialogOpen}
      close={closeDialog}
      closeButtonLabelText={t('closeDialog')}
    >
      <Dialog.Header
        id="apartment-revaluation-dialog-header"
        title={t('title')}
        iconLeft={<IconInfoCircle aria-hidden />}
      />
      <ApartmentRevaluationFormContainer
        revaluation={revaluation}
        apartmentId={apartmentId}
        reservationId={reservationId}
        customer={customer}
        closeDialog={closeDialog}
        handleFormCallback={handleFormCallback}
      />
    </Dialog>
  );
};

export default ApartmentRevaluationModal;
