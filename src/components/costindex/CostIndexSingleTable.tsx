import { useTranslation } from 'react-i18next';
import reportStyles from '../../pages/reports/Reports.module.scss';
import formatDateTime from '../../utils/formatDateTime';
import React from 'react';

const T_PATH = 'components.costindex.common';

interface Props {
  costIndex: { valid_from: string; value: string };
}

const CostIndexSingleTable = ({ costIndex }: Props): JSX.Element => {
  const { t: translate } = useTranslation();
  const t = (label: string) => translate(`${T_PATH}.${label}`);
  console.log('COST INDEX', costIndex);
  return (
    <table className={reportStyles.costIndexInfoTable}>
      <tbody>
        <tr>
          <th>{t('date')}</th>
          <td>{formatDateTime(costIndex.valid_from, true)}</td>
        </tr>
        <tr>
          <th>{t('index')}</th>
          <td>{costIndex.value}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CostIndexSingleTable;
