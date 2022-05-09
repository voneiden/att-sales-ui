import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Checkbox } from 'hds-react';
import { useTranslation } from 'react-i18next';

import formattedSalesPrice from '../../utils/formatSalesPrice';
import getApiBaseUrl from '../../utils/getApiBaseUrl';
import ProjectName from '../project/ProjectName';
import { Apartment, ApartmentInstallment, ApartmentReservation, Project } from '../../types';
import { renderApartmentDetails, renderApartmentPrice } from './InstallmentsItem';
import { toast } from '../common/toast/ToastManager';
import { useDownloadFile } from '../../utils/useDownloadFile';

import styles from './InstallmentsInvoice.module.scss';

const T_PATH = 'components.installments.InstallmentsInvoice';

interface IProps {
  apartment: Apartment;
  handleCloseCallback: () => void;
  installments: ApartmentInstallment[];
  project: Project;
  reservationId: ApartmentReservation['id'];
}

const InstallmentsInvoice = ({
  apartment,
  handleCloseCallback,
  installments,
  project,
  reservationId,
}: IProps): JSX.Element => {
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState(new Array(installments.length).fill(false));
  const [urlParams, setUrlParams] = useState('');

  const preDownloading = () => setisLoading(true);
  const postDownloading = () => setisLoading(false);

  const onError = () => {
    setisLoading(false);
    toast.show({ type: 'error' });
  };

  const getFileName = (): string => {
    const projectName = project.housing_company.replace(/\s/g, '-').toLocaleLowerCase();
    const apartmentNumber = apartment.apartment_number.replace(/\s/g, '').toLocaleLowerCase();
    // Example output: "laskut_as-oy-project-x_a01_2022-01-01.pdf"
    return `laskut${JSON.stringify(projectName + '_' + apartmentNumber)}${new Date().toJSON().slice(0, 10)}.pdf`;
  };

  const downloadFile = () => {
    const apiBaseUrl = getApiBaseUrl();

    return axios.get(`${apiBaseUrl}/apartment_reservations/${reservationId}/installments/invoices?index=${urlParams}`, {
      responseType: 'blob',
      // TODO: auth token in headers
      // headers: {
      //   Authorization: `Bearer ${apiToken}`,
      // }
    });
  };

  const {
    download,
    ref: fileRef,
    url: fileUrl,
    name: fileName,
  } = useDownloadFile({
    apiDefinition: downloadFile,
    getFileName,
    onError,
    postDownloading,
    preDownloading,
  });

  const handleInputChange = (inputIndex: number) => {
    const updatedCheckedState = checkedRows.map((item, index) => (index === inputIndex ? !item : item));
    setCheckedRows(updatedCheckedState);
  };

  const handleSelectAll = () => {
    setCheckedRows(new Array(installments.length).fill(!allChecked));
    setAllChecked(!allChecked);
  };

  useEffect(() => {
    const selectedIndexes = checkedRows.reduce((selected: [], currentState: boolean, index: number) => {
      if (currentState === true) {
        return [...selected, index];
      }
      return selected;
    }, []);

    setUrlParams(selectedIndexes.toString());
  }, [checkedRows]);

  return (
    <>
      <div className={styles.projectRow}>
        <ProjectName project={project} />
      </div>
      <div className={styles.apartmentRow}>
        {renderApartmentDetails(apartment)}
        {renderApartmentPrice(project, apartment)}
      </div>
      <table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>
              <Checkbox
                id="selectAll"
                value="selectAll"
                label={t(`${T_PATH}.selectAll`)}
                checked={allChecked}
                onChange={() => handleSelectAll()}
              />
            </th>
            <th className={styles.sumColumn}>{t(`${T_PATH}.sum`)}</th>
            <th>{t(`${T_PATH}.dueDate`)}</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((installment, index) => (
            <tr key={installment.type}>
              <td className={styles.indented}>
                <Checkbox
                  id={installment.type}
                  value={installment.type}
                  label={t(`ENUMS.InstallmentTypes.${installment.type}`)}
                  checked={checkedRows[index]}
                  onChange={() => handleInputChange(index)}
                />
              </td>
              <td className={styles.sumColumn}>{formattedSalesPrice(installment.amount)}</td>
              <td>{installment.due_date ? moment(installment.due_date).format('D.M.YYYY') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.printButton}>
        <a href={fileUrl} download={fileName} className="hiddenFromScreen" ref={fileRef}>
          {t(`${T_PATH}.download`)}
        </a>
        <Button
          disabled={!urlParams.length}
          isLoading={isLoading}
          loadingText={t(`${T_PATH}.print`)}
          onClick={download}
        >
          {t(`${T_PATH}.print`)}
        </Button>
        <Button className={styles.closeBtn} variant="secondary" onClick={() => handleCloseCallback()}>
          {t(`${T_PATH}.close`)}
        </Button>
      </div>
    </>
  );
};

export default InstallmentsInvoice;
