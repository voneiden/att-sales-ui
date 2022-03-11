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
import { ROUTES } from '../enums';
import { useGetCustomerByIdQuery } from '../redux/services/api';
import { Customer } from '../types';

import styles from './CustomerDetail.module.scss';

const T_PATH = 'pages.CustomerDetail';

const CustomerDetail = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { customerId } = useParams();
  const { data: customer, isLoading, isError, isSuccess } = useGetCustomerByIdQuery(customerId || '0');

  const breadcrumbAncestors: BreadcrumbItem[] = [
    {
      label: t(`${T_PATH}.customers`),
      path: `/${ROUTES.CUSTOMERS}`,
    },
  ];

  const currentBreadcrumb = (customer?: Customer) => {
    let breadcrumb = '';

    if (customerId) {
      breadcrumb = customerId;
    }

    if (customer) {
      const primary = `${customer.primary_profile.last_name}, ${customer.primary_profile.first_name}`;
      let combined = primary;
      if (customer.secondary_profile) {
        combined = primary + ` (${customer.secondary_profile.last_name}, ${customer.secondary_profile.first_name})`;
      }
      breadcrumb = combined;
    }

    return breadcrumb;
  };

  const renderBreadcrumb = () => <Breadcrumbs current={currentBreadcrumb(customer)} ancestors={breadcrumbAncestors} />;

  if (isLoading) {
    return (
      <Container>
        {renderBreadcrumb()}
        <StatusText>{t(`${T_PATH}.loading`)}...</StatusText>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        {renderBreadcrumb()}
        <Notification type="error" size="small" style={{ marginTop: 15 }}>
          {t(`${T_PATH}.errorLoadingCustomer`)}
        </Notification>
      </Container>
    );
  }

  if (!isSuccess || !customer) return null;

  return (
    <Container>
      {renderBreadcrumb()}
      <div className={styles.titleRow}>
        <h1>{t(`${T_PATH}.customerDetails`)}</h1>
        <div className={styles.customerEditLink}>
          <Button size="small" variant="secondary" color="primary" iconLeft={<IconPenLine />}>
            {t(`${T_PATH}.editCustomerBtn`)}
          </Button>
        </div>
      </div>
      <CustomerInfo customer={customer} />
      <div className={styles.tabsWrapper}>
        <Tabs>
          <TabList className={styles.tabs}>
            <Tab>{t(`${T_PATH}.tabReservations`)}</Tab>
            <Tab>{t(`${T_PATH}.tabInstallments`)}</Tab>
          </TabList>
          <TabPanel className={styles.tabPanel}>
            <CustomerReservations customer={customer} />
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <Installments customer={customer} />
          </TabPanel>
        </Tabs>
      </div>
    </Container>
  );
};

export default CustomerDetail;
