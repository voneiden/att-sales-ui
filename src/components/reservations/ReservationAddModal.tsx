import React, { useState } from 'react';
import { Button, Dialog } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import formattedLivingArea from '../../utils/formatLivingArea';
import Label from '../common/label/Label';
import SelectCustomerDropdown from '../customers/SelectCustomerDropdown';
import { RootState } from '../../redux/store';
import { toast } from '../common/toast/ToastManager';
import { hideReservationAddModal } from '../../redux/features/reservationAddModalSlice';

import styles from './ReservationModal.module.scss';

const T_PATH = 'components.reservations.ReservationAddModal';

const ReservationAddModal = (): JSX.Element | null => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationAddModal = useSelector((state: RootState) => state.reservationAddModal);
  const isDialogOpen = reservationAddModal.isOpened;
  const apartment = reservationAddModal.content?.apartment;
  const project = reservationAddModal.content?.project;
  const [isLoading, setIsLoading] = useState(false);

  if (!isDialogOpen) return null;

  if (!project || !apartment) {
    toast.show({
      type: 'error',
      title: t(`${T_PATH}.errorTitle`),
      content: t(`${T_PATH}.noApartmentOrProject`),
    });

    return null;
  }

  const closeDialog = () => dispatch(hideReservationAddModal());

  const handleFormCallback = () => {
    setIsLoading(true);
    // TODO: Add operations here
    console.log('form submitted');
    console.log('apartment_uuid:', apartment.apartment_uuid);
    setIsLoading(false);
    closeDialog();
  };

  const formId = `reservation-add-form-${apartment.apartment_uuid}`;

  return (
    <Dialog
      id={`reservation-add-dialog-${apartment.apartment_uuid}`}
      aria-labelledby="reservation-add-dialog-header"
      isOpen={isDialogOpen}
      close={closeDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
      className={styles.reservationAddDialog}
      variant="primary"
    >
      <Dialog.Header id="reservation-add-dialog-header" title={t(`${T_PATH}.addApplicant`)} />
      <Dialog.Content>
        <div className={styles.details}>
          <div className={styles.projectHousingCompany}>
            <Label type={project.ownership_type}>{project.ownership_type}</Label>
          </div>
          <div>
            <div className={styles.title}>
              <h3>{project.housing_company}</h3>
              <span>
                <strong>{project.district}, </strong>
                {project.street_address}
              </span>
            </div>
            <div className={styles.apartment}>
              <strong>{apartment.apartment_number}</strong>
              <span>&mdash;</span>
              {apartment.apartment_structure}
              <span>&mdash;</span>
              {apartment.living_area && formattedLivingArea(apartment.living_area)}
            </div>
          </div>
        </div>
        <SelectCustomerDropdown formId={formId} handleFormCallback={handleFormCallback} />
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button variant="primary" type="submit" form={formId} disabled={isLoading}>
          {t(`${T_PATH}.addBtn`)}
        </Button>
        <Button variant="secondary" onClick={() => closeDialog()}>
          {t(`${T_PATH}.cancelBtn`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default ReservationAddModal;
