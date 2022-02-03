import React, { useState } from 'react';
import cx from 'classnames';
import i18n from 'i18next';
import { Button, Dialog, Notification, DateInput, TextArea, TextInput, ToggleButton } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import ProjectName from '../project/ProjectName';
import { RootState } from '../../redux/store';
import { formattedLivingArea } from '../../utils/formatLivingArea';
import { toast } from '../../components/common/errorToast/ErrorToastManager';
import { hideOfferModal } from '../../redux/features/offerModalSlice';

import styles from './OfferModal.module.scss';

const T_PATH = 'components.offer.OfferModal';

const OfferModal = (): JSX.Element | null => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offerModal = useSelector((state: RootState) => state.offerModal);
  const isOfferDialogOpen = offerModal.isOpened;
  const apartment = offerModal.content?.apartment;
  const customer = offerModal.content?.customer;
  const project = offerModal.content?.project;
  const [formData, setFormData] = useState({
    offerMessage: '',
    offerDeclined: false,
    offerAccepted: false,
    offerDueDate: '',
    offerExtra: '',
  });

  const closeOfferDialog = () => dispatch(hideOfferModal());

  const handleSubmit = () => {
    // TODO: Add operations here
    console.log(formData);
    closeOfferDialog();
  };

  if (!isOfferDialogOpen) return null;

  if (!project || !apartment || !customer) {
    toast.show({
      type: 'error',
      title: t(`${T_PATH}.missingValuesErrorTitle`),
      content: t(`${T_PATH}.noProjectApartmentOrCustomer`),
    });

    return null;
  }

  const renderOfferStatus = () => {
    const offerStatusTime = 'D.M.YYYY 11:22'; // TODO: get actual time
    const offerSentText = t(`${T_PATH}.offerSent`);
    // TODO Return sent / accepted / declined messages
    // const offerAcceptedText = t(`${T_PATH}.offerAccepted`);
    // const offerDeclinedText = t(`${T_PATH}.offerDeclined`);

    return (
      <div className={styles.offerStatus}>
        <Notification type="info" label={`${offerSentText} ${offerStatusTime}`} />
        {/* TODO: Return sent / accepted / declined messages
        <Notification type="success" label={`${offerAcceptedText} ${offerStatusTime}`} />
        <Notification type="error" label={`${offerDeclinedText} ${offerStatusTime}`} />
        */}
      </div>
    );
  };

  const renderTable = () => (
    <table className={cx(styles.offerTable, 'hds-table hds-table--light')}>
      <thead className="hds-table__header-row">
        <tr>
          <th>{t(`${T_PATH}.apartment`)}</th>
          <th>{t(`${T_PATH}.floor`)}</th>
          <th>{t(`${T_PATH}.applicant`)}</th>
          {project.ownership_type.toLowerCase() === 'haso' ? (
            <>
              <th>{t(`${T_PATH}.hasoNumber`)}</th>
              <th>{t(`${T_PATH}.customerIsOver55`)}</th>
              <th>{t(`${T_PATH}.customerHasHasoOwnership`)}</th>
            </>
          ) : (
            <th>{t(`${T_PATH}.familyWithChildren`)}</th>
          )}
        </tr>
      </thead>
      <tbody className="hds-table__content">
        <tr>
          <td>
            <span className={styles.emphasized}>{apartment.apartment_number}</span>
            <span>{apartment.apartment_structure}&nbsp;</span>
            <span className={styles.muted}>
              ({apartment.living_area ? formattedLivingArea(apartment.living_area) : '-'})
            </span>
          </td>
          <td>
            {apartment.floor}/{apartment.floor_max}
          </td>
          <td>
            {/* TODO: get reservation number */}
            123. {customer.fullName} {customer.nin}
          </td>
          {project.ownership_type.toLowerCase() === 'haso' ? (
            <>
              <td>{customer.haso_number}</td>
              <td>{customer.is_over_55_years_old ? t(`${T_PATH}.yes`) : t(`${T_PATH}.no`)}</td>
              <td>{customer.has_haso_ownership ? t(`${T_PATH}.yes`) : t(`${T_PATH}.no`)}</td>
            </>
          ) : (
            <td>{customer.family_with_children ? t(`${T_PATH}.yes`) : t(`${T_PATH}.no`)}</td>
          )}
        </tr>
      </tbody>
    </table>
  );

  const renderForm = () => {
    const handleAcceptedToggle = () => {
      if (formData.offerAccepted) {
        setFormData({ ...formData, offerAccepted: false });
      } else {
        setFormData({ ...formData, offerAccepted: true, offerDeclined: false });
      }
    };

    const handleDeclinedToggle = () => {
      if (formData.offerDeclined) {
        setFormData({ ...formData, offerDeclined: false });
      } else {
        setFormData({ ...formData, offerDeclined: true, offerAccepted: false });
      }
    };

    const currentLanguageCode = () => {
      let locale: 'en' | 'fi' | 'sv';
      switch (i18n.language) {
        case 'en':
          locale = 'en';
          break;
        case 'sv':
          locale = 'sv';
          break;
        default:
          locale = 'fi';
      }
      return locale;
    };

    return (
      <form id="offer-form" className={styles.offerDialogForm}>
        <div className={cx(styles.textareaColumn, styles.fullHeightColumn)}>
          <div className={styles.inputWrapper}>
            <TextArea
              id="offer-message"
              label={t(`${T_PATH}.message`)}
              helperText={t(`${T_PATH}.messageHelpText`)}
              defaultValue={formData.offerMessage}
              onChange={(e) => setFormData({ ...formData, offerMessage: e.target.value })}
            />
          </div>
        </div>
        <div className={styles.textareaColumn}>
          <div className={styles.inputWrapper}>
            <TextInput id="offer-date-sent" label={t(`${T_PATH}.offerSent`)} readOnly defaultValue="D.M.YYYY 11:22" />
          </div>
          <div className={styles.inputWrapper}>
            <DateInput
              id="offer-due-date"
              label={t(`${T_PATH}.offerDueDate`)}
              helperText={t(`${T_PATH}.dateFormatHelpText`)}
              language={currentLanguageCode()}
              disableConfirmation
              defaultValue={formData.offerDueDate}
              onChange={(value) => setFormData({ ...formData, offerDueDate: value })}
            />
          </div>
          <div className={cx(styles.inputWrapper, styles.toggleWrapper)}>
            <div className={styles.toggle}>
              <ToggleButton
                checked={formData.offerAccepted}
                id="offer-toggle-accepted"
                label={t(`${T_PATH}.offerAccepted`)}
                onChange={() => handleAcceptedToggle()}
                variant="inline"
              />
            </div>
            <div className={styles.toggle}>
              <ToggleButton
                checked={formData.offerDeclined}
                id="offer-toggle-declined"
                label={t(`${T_PATH}.offerDeclined`)}
                onChange={() => handleDeclinedToggle()}
                theme={{
                  '--toggle-button-color': 'var(--color-brick)',
                  '--toggle-button-hover-color': 'var(--color-brick-dark)',
                }}
                variant="inline"
              />
              <div className={styles.toggleHelpText}>
                {project.ownership_type.toLowerCase() === 'haso'
                  ? t(`${T_PATH}.toggleDeclineHelpHaso`)
                  : t(`${T_PATH}.toggleDeclineHelpHitas`)}
              </div>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <TextArea
              id="offer-extra-info"
              label={t(`${T_PATH}.offerExtraInfo`)}
              rows={3}
              helperText={t(`${T_PATH}.offerExtraInfoDescription`)}
              defaultValue={formData.offerExtra}
              onChange={(e) => setFormData({ ...formData, offerExtra: e.target.value })}
            />
          </div>
        </div>
      </form>
    );
  };

  return (
    <Dialog
      id={`offer-dialog-${apartment.uuid}-${customer.id}`}
      aria-labelledby="offer-dialog-header"
      isOpen={isOfferDialogOpen}
      close={closeOfferDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
      className={styles.offerDialog}
    >
      <Dialog.Header id="offer-dialog-header" title={t(`${T_PATH}.offer`)} />
      <Dialog.Content>
        {renderOfferStatus()}
        <div className={styles.projectDetails}>
          <ProjectName project={project} />
        </div>
        {renderTable()}
        {renderForm()}
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button variant="primary" onClick={() => handleSubmit()}>
          {t(`${T_PATH}.sendOffer`)}
          {/* TODO: Show save button text when offer has already been sent
          {t(`${T_PATH}.save`)}
          */}
        </Button>
        <Button variant="secondary" onClick={() => closeOfferDialog()}>
          {t(`${T_PATH}.cancel`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );
};

export default OfferModal;
