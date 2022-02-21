import React from 'react';
import cx from 'classnames';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Container from '../components/common/container/Container';
import CustomerSearchForm from '../components/customers/CustomerSearchForm';
import CustomerTable from '../components/customers/CustomerTable';
import dummyCustomers from '../mocks/customers.json';

import styles from './CustomerSearch.module.scss';

const T_PATH = 'pages.CustomerSearch';

const CustomerSearch = (): JSX.Element => {
  const { t } = useTranslation();
  // TODO: get actual customers data
  const customers: any = dummyCustomers;
  // TODO: get success, loading and error states from the actual query
  const isLoading = false;
  const isError = false;
  // TODO: get boolean value from url search parameters
  const hasSearchQuery = true;

  return (
    <>
      <Container className={styles.customerSearchTop}>
        <h1 className={styles.pageHeader}>{t(`${T_PATH}.pageTitle`)}</h1>
        <div className={styles.customerFormWrapper}>
          <CustomerSearchForm />
          <a href="#todo" className={cx(`${styles.createNewBtn} hds-button hds-button--secondary`)}>
            <span className="hds-button__label">{t(`${T_PATH}.btnCreateCustomer`)}</span>
          </a>
        </div>
      </Container>
      {!isLoading && isError && (
        <Container>
          <Notification type="error">{t(`${T_PATH}.errorLoadingCustomers`)}</Notification>
        </Container>
      )}
      {!isError && (
        <Container wide>
          <div className={styles.customerTableContainer}>
            <CustomerTable customers={customers} hasSearchQuery={hasSearchQuery} isLoading={isLoading} />
          </div>
        </Container>
      )}
    </>
  );
};

export default CustomerSearch;
