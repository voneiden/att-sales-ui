import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { Button, Dialog, IconPrinter } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { ApartmentInstallment } from '../../types';

import styles from './InstallmentsTable.module.scss';
import InstallmentsTableRow from './InstallmentsTableRow';

const T_PATH = 'components.installments.InstallmentsTable';

interface IProps {
  installments: ApartmentInstallment[];
}

const InstallmentsTable = ({ installments }: IProps) => {
  const { t } = useTranslation();
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const openPrintDialogButtonRef = useRef(null);
  const closePrintDialog = () => setIsPrintDialogOpen(false);

  const renderTableHeaders = () => (
    <thead className="hds-table__header-row">
      <tr>
        <th>{t(`${T_PATH}.installmentType`)}</th>
        <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.sum`)}</th>
        <th>{t(`${T_PATH}.dueDate`)}</th>
        <th>{t(`${T_PATH}.IbanAccountNumber`)}</th>
        <th>{t(`${T_PATH}.referenceNumber`)}</th>
        <th>{t(`${T_PATH}.sentToSAP`)}</th>
      </tr>
    </thead>
  );

  const renderTableContent = () => (
    <tbody className="hds-table__content">
      {!!installments.length &&
        installments.map((installment) => <InstallmentsTableRow key={installment.type} installment={installment} />)}
    </tbody>
  );

  const renderTableFooter = () => (
    <tfoot className="hds-table__content">
      <tr>
        <td>
          <strong>{t(`${T_PATH}.total`)}</strong>
        </td>
        <td style={{ textAlign: 'right' }}>
          <strong>&euro;</strong>
        </td>
        <td colSpan={4}></td>
      </tr>
    </tfoot>
  );

  const renderPrintDialog = () => (
    <Dialog
      id="print-dialog"
      aria-labelledby="print-dialog-header"
      isOpen={isPrintDialogOpen}
      close={closePrintDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
      focusAfterCloseRef={openPrintDialogButtonRef}
      className={styles.printDialog}
    >
      <Dialog.Header id="print-dialog-header" title={t(`${T_PATH}.printBankTransfers`)} />
      <Dialog.Content>TODO</Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          onClick={() => {
            // TODO: Add operations here
            closePrintDialog();
          }}
        >
          {t(`${T_PATH}.print`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );

  return (
    <div className={styles.installmentsWrapper}>
      <table className={cx(styles.installmentsTable, 'hds-table hds-table--light')}>
        {renderTableHeaders()}
        {renderTableContent()}
        {renderTableFooter()}
      </table>
      <Button
        variant="primary"
        size="small"
        iconLeft={<IconPrinter />}
        ref={openPrintDialogButtonRef}
        onClick={() => setIsPrintDialogOpen(true)}
      >
        {t(`${T_PATH}.printBankTransfers`)}
      </Button>
      {renderPrintDialog()}
    </div>
  );
};

export default InstallmentsTable;
