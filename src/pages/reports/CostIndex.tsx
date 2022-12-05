import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../components/common/container/Container';
import CostIndexTable from '../../components/costindex/CostIndexTable';
import { usePageTitle } from '../../utils/usePageTitle';

const T_PATH = 'pages.costindex.CostIndex';

const CostIndex = (): JSX.Element => {
  const { t } = useTranslation();

  usePageTitle(t('PAGES.costindex'));

  return (
    <>
      <Container>
        <h1>{t(`${T_PATH}.costIndexPageTitle`)}</h1>
      </Container>
      <CostIndexTable />
    </>
  );
};

export default CostIndex;
