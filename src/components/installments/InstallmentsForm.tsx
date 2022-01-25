import React from 'react';
import cx from 'classnames';
import { DateInput, IconCheckCircleFill, Select, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';

import formattedSalesPrice from '../../utils/formatSalesPrice';
import { ApartmentInstallment } from '../../types';
import { InstallmentTypes } from '../../enums';

import styles from './InstallmentsForm.module.scss';

const T_PATH = 'components.installments.InstallmentsForm';

interface IProps {
  installments: ApartmentInstallment[];
  targetPrice?: number;
}

const InstallmentsForm = ({ installments, targetPrice }: IProps) => {
  const { t } = useTranslation();

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th style={{ width: '275px' }}>{t(`${T_PATH}.installmentType`)}</th>
        <th style={{ width: '140px' }}>{t(`${T_PATH}.sum`)} &euro;</th>
        <th style={{ width: '180px' }}>{t(`${T_PATH}.dueDate`)}</th>
        <th style={{ width: '220px' }}>{t(`${T_PATH}.IbanAccountNumber`)}</th>
        <th className={styles.moreHorizontalPadding}>{t(`${T_PATH}.referenceNumber`)}</th>
        <th>{t(`${T_PATH}.sentToSAP`)}</th>
      </tr>
    </thead>
  );

  const renderTableContent = () => (
    <tbody className="hds-table__content">
      {Object.keys(InstallmentTypes).map((row, index) => (
        <tr key={index}>
          <td>
            <Select label="" placeholder="Valitse" options={[{ label: 'test' }]} />
          </td>
          <td>
            <TextInput id="sum-input" label="" />
          </td>
          <td>
            <DateInput id="due-date" initialMonth={new Date()} label="" language="en" onChange={() => null} />
          </td>
          <td>
            <TextInput id="iban-input" label="" />
          </td>
          <td className={styles.moreHorizontalPadding}>-</td>
          <td>-</td>
        </tr>
      ))}
    </tbody>
  );

  const renderTableFooter = () => (
    <tfoot className="hds-table__content">
      <tr>
        <th style={{ textAlign: 'right' }}>{t(`${T_PATH}.total`)}</th>
        <td>
          <span className={styles.totalWithIcon}>
            <strong>- &euro;</strong> <IconCheckCircleFill color="var(--color-tram)" />
          </span>
        </td>
        <th style={{ textAlign: 'right' }}>
          <strong>{t(`${T_PATH}.salesPrice`)}</strong>
        </th>
        <td>{targetPrice ? formattedSalesPrice(targetPrice) : '-'}</td>
        <td colSpan={2}></td>
      </tr>
    </tfoot>
  );

  return (
    <div className={styles.formWrapper}>
      <table className={cx(styles.installmentsTable, 'hds-table hds-table--light')}>
        {renderTableHeader()}
        {renderTableContent()}
        {renderTableFooter()}
      </table>
    </div>
  );
};

export default InstallmentsForm;
