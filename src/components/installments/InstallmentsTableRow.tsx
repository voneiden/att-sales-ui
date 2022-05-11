import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, IconQuestionCircle } from 'hds-react';

import formatDateTime from '../../utils/formatDateTime';
import { ApartmentInstallment } from '../../types';

import styles from './InstallmentsTableRow.module.scss';
import formattedCurrency from '../../utils/formatCurrency';

const T_PATH = 'components.installments.InstallmentsTableRow';

interface IProps {
  installment: ApartmentInstallment;
}

const InstallmentsTableRow = ({ installment }: IProps) => {
  const { t } = useTranslation();
  const openConfirmationDialogButtonRef = useRef(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const installmentAmount = installment.amount / 100;
  const closeConfirmation = () => setIsConfirmationOpen(false);

  const renderConfirmationDialog = () => (
    <Dialog
      id="confirmation-dialog"
      aria-labelledby="confirmation-dialog-title"
      isOpen={isConfirmationOpen}
      focusAfterCloseRef={openConfirmationDialogButtonRef}
    >
      <Dialog.Header
        id="confirmation-dialog-title"
        title={t(`${T_PATH}.areYouSure`)}
        iconLeft={<IconQuestionCircle aria-hidden="true" />}
      />
      <Dialog.Content>
        <p>{t(`${T_PATH}.infoTextSendingToSAP`)}</p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.installmentType`)}</th>
                <td>{t(`ENUMS.InstallmentTypes.${installment.type}`)}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.sum`)}</th>
                <td>{formattedCurrency(installmentAmount)}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.dueDate`)}</th>
                <td>{installment.due_date ? formatDateTime(installment.due_date, true) : '-'}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.IbanAccountNumber`)}</th>
                <td>{installment.account_number}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.referenceNumber`)}</th>
                <td>{installment.reference_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          onClick={() => {
            // TODO: Add operations here
            closeConfirmation();
          }}
          disabled
        >
          {t(`${T_PATH}.sendToSAP`)}
        </Button>
        <Button onClick={closeConfirmation} variant="secondary">
          {t(`${T_PATH}.cancel`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );

  return (
    <tr>
      <td>{t(`ENUMS.InstallmentTypes.${installment.type}`)}</td>
      <td style={{ textAlign: 'right' }}>{formattedCurrency(installmentAmount)}</td>
      <td>{installment.due_date ? formatDateTime(installment.due_date, true) : '-'}</td>
      <td>{installment.account_number}</td>
      <td>{installment.reference_number}</td>
      <td className={styles.buttonCell}>
        <Button
          variant="secondary"
          size="small"
          ref={openConfirmationDialogButtonRef}
          onClick={() => setIsConfirmationOpen(true)}
        >
          {t(`${T_PATH}.sendToSAP`)}
        </Button>
      </td>
      <>{renderConfirmationDialog()}</>
    </tr>
  );
};

export default InstallmentsTableRow;
