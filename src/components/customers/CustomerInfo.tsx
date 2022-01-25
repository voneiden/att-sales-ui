import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Checkbox, Notification } from 'hds-react';

import { Customer, CustomerBaseDetails } from '../../types';

import styles from './CustomerInfo.module.scss';

const T_PATH = 'components.customers.CustomerInfo';

interface IProps {
  customer: Customer;
}

interface InfoItemProps {
  label: string;
  largeFont?: boolean;
  children?: string | JSX.Element;
}

const CustomerInfo = ({ customer }: IProps): JSX.Element => {
  const { t } = useTranslation();

  if (!customer) {
    return (
      <Notification type="error" size="small" style={{ marginBottom: 24 }}>
        {t(`${T_PATH}.errorNoCustomer`)}
      </Notification>
    );
  }

  const InfoItem = ({ label, largeFont, children }: InfoItemProps): JSX.Element => (
    <div className={styles.singleInfoItem}>
      <div className={styles.singleInfoItemLabel}>{label}</div>
      <div className={cx(styles.singleInfoItemContent, largeFont && styles.largeFont)}>{children}</div>
    </div>
  );

  const renderCustomerInfo = (
    customer: CustomerBaseDetails,
    showExtraInfo: boolean,
    familyWithChildren?: Customer['family_with_children']
  ) => (
    <>
      <div className={styles.customerInfoColumn}>
        <InfoItem label={t(`${T_PATH}.name`)} largeFont>
          {customer.fullName}
        </InfoItem>
        <InfoItem label={t(`${T_PATH}.nin`)}>{customer.nin}</InfoItem>
      </div>
      <div className={styles.customerInfoColumn}>
        <InfoItem label={t(`${T_PATH}.contactDetails`)}>
          <>
            <div>{customer.address}</div>
            <div>{customer.phone}</div>
            <div>{customer.email}</div>
          </>
        </InfoItem>
        {familyWithChildren !== undefined && (
          <InfoItem label={t(`${T_PATH}.familyWithChildren`)}>
            {familyWithChildren ? t(`${T_PATH}.yes`) : t(`${T_PATH}.no`)}
          </InfoItem>
        )}
      </div>
      {showExtraInfo && (
        <div className={styles.customerInfoColumn}>
          <InfoItem label={t(`${T_PATH}.registered`)}>-</InfoItem>
          <InfoItem label={t(`${T_PATH}.lastContactDate`)}>-</InfoItem>
          <InfoItem label={t(`${T_PATH}.extraInfo`)}>-</InfoItem>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className={styles.customerInfoWrapper}>
        {renderCustomerInfo(customer, true, customer.family_with_children)}
      </div>

      <div className={styles.extraInfoRow}>
        <div className={styles.extraInfoRowItem}>
          <InfoItem label={t(`${T_PATH}.hitasOwnership`)}>
            <Checkbox
              id="customerHasHitasOwnership"
              label={t(`${T_PATH}.customerHasHitasOwnership`)}
              checked={customer.has_hitas_ownership}
              readOnly
              disabled
            />
          </InfoItem>
        </div>
        <div className={styles.extraInfoRowItem}>
          <InfoItem label={t(`${T_PATH}.haso`)}>
            <div className={styles.checkBoxRow}>
              <Checkbox
                id="customerIsOver55"
                label={t(`${T_PATH}.customerIsOver55`)}
                checked={customer.is_over_55_years_old}
                readOnly
                disabled
                style={{ marginRight: 'var(--spacing-l)' }}
              />
              <Checkbox
                id="customerHasHitasOwnership"
                label={t(`${T_PATH}.customerHasHasoOwnership`)}
                checked={customer.has_haso_ownership}
                readOnly
                disabled
              />
            </div>
          </InfoItem>
        </div>
        <div className={styles.extraInfoRowItem}>
          <InfoItem label={t(`${T_PATH}.hasoNumber`)}>{customer.haso_number}</InfoItem>
        </div>
      </div>

      {!!customer.coApplicant && (
        <>
          <h2 className={styles.coApplcantTitle}>{t(`${T_PATH}.coApplicant`)}</h2>
          <div className={styles.customerInfoWrapper}>{renderCustomerInfo(customer.coApplicant, false)}</div>
        </>
      )}
    </>
  );
};

export default CustomerInfo;
