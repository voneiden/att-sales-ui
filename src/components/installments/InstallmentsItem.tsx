import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { Button, Dialog, IconAngleDown, IconAngleRight, IconPenLine, useAccordion } from 'hds-react';
import { useTranslation } from 'react-i18next';

import formattedLivingArea from '../../utils/formatLivingArea';
import formattedSalesPrice from '../../utils/formatSalesPrice';
import InstallmentsForm from './InstallmentsForm';
import InstallmentsTable from './InstallmentsTable';
import ProjectName from '../project/ProjectName';
import { Apartment, ApartmentInstallment, Project } from '../../types';

import styles from './InstallmentsItem.module.scss';

const T_PATH = 'components.installments.InstallmentsItem';

interface IProps {
  apartment: Apartment;
  installments: ApartmentInstallment[];
  project: Project;
}

const InstallmentsItem = ({ apartment, installments, project }: IProps) => {
  const { t } = useTranslation();
  const openFormDialogButtonRef = useRef(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const {
    isOpen: isAccordionOpen,
    buttonProps: accordionButtonProps,
    contentProps: accordionContentProps,
  } = useAccordion({ initiallyOpen: false });

  const closeFormDialog = () => setIsFormDialogOpen(false);

  const accordionIcon = isAccordionOpen ? <IconAngleDown aria-hidden /> : <IconAngleRight aria-hidden />;

  const renderApartmentDetails = () => (
    <div className={styles.apartmentStructure}>
      <span className={styles.emphasized}>{apartment.apartment_number}</span>
      <span>
        {apartment.apartment_structure} ({formattedLivingArea(apartment.living_area)})
      </span>
    </div>
  );

  const renderApartmentPrice = () => {
    if (project.ownership_type.toLowerCase() === 'haso') {
      return (
        <div className={styles.price}>
          <span>
            {t(`${T_PATH}.rightOfOccupancyPayment`)}
            <span className={styles.emphasized}>
              {apartment.right_of_occupancy_payment ? formattedSalesPrice(apartment.right_of_occupancy_payment) : '-'}
            </span>
          </span>
        </div>
      );
    }

    return (
      <div className={styles.price}>
        <span>
          {t(`${T_PATH}.salesPrice`)}
          <span className={styles.emphasized}>
            {apartment.sales_price ? formattedSalesPrice(apartment.sales_price) : '-'}
          </span>
        </span>
        <span>
          {t(`${T_PATH}.debtFreeSalesPrice`)}
          <span className={styles.emphasized}>
            {apartment.debt_free_sales_price ? formattedSalesPrice(apartment.debt_free_sales_price) : '-'}
          </span>
        </span>
      </div>
    );
  };

  const renderInstallmentsTable = () => {
    if (!!installments?.length) {
      return (
        <div {...accordionContentProps}>
          <InstallmentsTable installments={installments} />
        </div>
      );
    }
  };

  const renderApartmentRowActions = () => {
    if (!!installments?.length) {
      return (
        <>
          <Button
            variant="supplementary"
            size="small"
            iconLeft={<IconPenLine />}
            ref={openFormDialogButtonRef}
            onClick={() => setIsFormDialogOpen(true)}
          >
            {t(`${T_PATH}.editInstallments`)}
          </Button>
          <button
            className={cx(
              styles.toggleButton,
              'hds-button hds-button--supplementary hds-button--theme-black hds-button--small'
            )}
            {...accordionButtonProps}
          >
            <span className={cx(styles.toggleButtonLabel, 'hds-button__label')}>
              <span className="hiddenFromScreen">
                {isAccordionOpen ? t(`${T_PATH}.openAccordion`) : t(`${T_PATH}.closeAccordion`)}
              </span>
              {accordionIcon}
            </span>
          </button>
        </>
      );
    }

    return (
      <Button variant="secondary" size="small" ref={openFormDialogButtonRef} onClick={() => setIsFormDialogOpen(true)}>
        {t(`${T_PATH}.createInstallments`)}
      </Button>
    );
  };

  const renderFormDialog = () => (
    <Dialog
      id="form-dialog"
      aria-labelledby="form-dialog-header"
      isOpen={isFormDialogOpen}
      close={closeFormDialog}
      closeButtonLabelText={t(`${T_PATH}.closeDialog`)}
      focusAfterCloseRef={openFormDialogButtonRef}
      className={styles.formDialog}
    >
      <Dialog.Header id="form-dialog-header" title={t(`${T_PATH}.installments`)} />
      <Dialog.Content>
        <div className={styles.formDialogProjectRow}>
          <ProjectName project={project} />
        </div>
        <div className={styles.formDialogApartmentRow}>
          {renderApartmentDetails()}
          {renderApartmentPrice()}
        </div>
        <div className={styles.formWrapper}>
          <InstallmentsForm
            installments={installments}
            targetPrice={
              project.ownership_type.toLowerCase() === 'haso'
                ? apartment.right_of_occupancy_payment
                : apartment.sales_price
            }
          />
        </div>
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          onClick={() => {
            // Add operations here
            closeFormDialog();
          }}
        >
          {t(`${T_PATH}.save`)}
        </Button>
      </Dialog.ActionButtons>
    </Dialog>
  );

  return (
    <>
      <div className={styles.apartmentRow}>
        <div className={styles.apartmentRowLeft}>
          {renderApartmentDetails()}
          <div>{renderApartmentPrice()}</div>
        </div>
        <div className={styles.apartmentRowRight}>{renderApartmentRowActions()}</div>
      </div>
      {renderInstallmentsTable()}
      {renderFormDialog()}
    </>
  );
};

export default InstallmentsItem;
