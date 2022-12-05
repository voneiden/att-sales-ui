import { Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../enums';
import Container from '../common/container/Container';
import Spinner from '../common/spinner/Spinner';
import CostIndexSingleTable from './CostIndexSingleTable';
import { useGetCostIndexesQuery } from '../../redux/services/api';

import reportStyles from '../../pages/reports/Reports.module.scss';

const T_PATH = 'components.costindex.CostIndexOverview';

const CostIndexOverview = (): JSX.Element => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();

  const t = (label: string) => translate(`${T_PATH}.${label}`);

  const { data, isLoading, isError } = useGetCostIndexesQuery();
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isError || !data) {
    content = (
      <Container>
        <Notification type="error" size="small" style={{ marginTop: 15 }}>
          {t('errorLoadingCostIndex')}
        </Notification>
      </Container>
    );
  } else {
    content = (
      <>
        <h3>{t('lastModification')}</h3>
        <CostIndexSingleTable costIndex={data[0]} />
        <a
          href={`/${ROUTES.COST_INDEX}`}
          className="hds-button hds-button--primary"
          onClick={(e) => {
            navigate(`/${ROUTES.COST_INDEX}`);
            e.preventDefault();
          }}
        >
          {t('modify')}
        </a>
      </>
    );
  }

  return (
    <Container wide className={reportStyles.wrapper}>
      <h2>{t('indexValue')}</h2>
      {content}
    </Container>
  );
};

export default CostIndexOverview;
