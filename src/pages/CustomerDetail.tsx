import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, IconPenLine, Notification, Tabs, TabList, Tab, TabPanel } from 'hds-react';

import Breadcrumbs, { BreadcrumbItem } from '../components/common/breadcrumbs/Breadcrumbs';
import Container from '../components/common/container/Container';
import CustomerInfo from '../components/customers/CustomerInfo';
import Installments from '../components/installments/Installments';
import CustomerReservations from '../components/customers/CustomerReservations';
import StatusText from '../components/common/statusText/StatusText';
import { Customer } from '../types';
import { ROUTES } from '../enums';

import styles from './CustomerDetail.module.scss';

import dummyCustomer from '../mocks/customers.json'; // TODO: remove and replace with real data

const T_PATH = 'pages.CustomerDetail';

const CustomerDetail = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { customerId } = useParams();

  // TODO: get data, success loading and error states from the actual query
  const customer = dummyCustomer[0] as Customer;
  const isSuccess = true;
  const isLoading = false;
  const isError = false;

  const breadcrumbAncestors: BreadcrumbItem[] = [
    {
      label: t(`${T_PATH}.customers`),
      path: `/${ROUTES.CUSTOMERS}`,
    },
  ];

  const renderPageContent = () => {
    if (isLoading) {
      return <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>;
    }

    if (isError) {
      return (
        <Notification type="error" size="small" style={{ marginTop: 15 }}>
          {t(`${T_PATH}.errorLoadingCustomer`)}
        </Notification>
      );
    }

    if (!isSuccess || !customer) return null;

    return (
      <>
        <CustomerInfo customer={customer} />
        <div className={styles.tabsWrapper}>
          <Tabs>
            <TabList className={styles.tabs}>
              <Tab>{t(`${T_PATH}.tabReservations`)}</Tab>
              <Tab>{t(`${T_PATH}.tabInstallments`)}</Tab>
            </TabList>
            <TabPanel className={styles.tabPanel}>
              <CustomerReservations />
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              <Installments />
            </TabPanel>
          </Tabs>
        </div>
      </>
    );
  };

  return (
    <Container>
      <Breadcrumbs current={customer.fullName || customerId || ''} ancestors={breadcrumbAncestors} />
      <div className={styles.titleRow}>
        <h1>{t(`${T_PATH}.customerDetails`)}</h1>
        <div className={styles.customerEditLink}>
          <Button size="small" variant="secondary" color="primary" iconLeft={<IconPenLine />}>
            {t(`${T_PATH}.editCustomerBtn`)}
          </Button>
        </div>
      </div>
      {renderPageContent()}
    </Container>
  );
};

export default CustomerDetail;
