import React from 'react';
import { Button, IconSearch, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './CustomerSearchForm.module.scss';

const T_PATH = 'components.customers.CustomerSearchForm';

const CustomerSearchForm = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div className={styles.searchForm}>
      <div className={styles.searchFields}>
        <TextInput
          id="customerSearchFormFirstName"
          label={t(`${T_PATH}.firstName`)}
          placeholder={t(`${T_PATH}.firstName`)}
        />
        <TextInput
          id="customerSearchFormLastName"
          label={t(`${T_PATH}.lastName`)}
          placeholder={t(`${T_PATH}.lastName`)}
        />
        <TextInput id="customerSearchFormPhone" label={t(`${T_PATH}.phone`)} placeholder={t(`${T_PATH}.phone`)} />
        <TextInput id="customerSearchFormEmail" label={t(`${T_PATH}.email`)} placeholder={t(`${T_PATH}.email`)} />
      </div>
      <div>
        <Button iconRight={<IconSearch />}>{t(`${T_PATH}.btnSearch`)}</Button>
      </div>
    </div>
  );
};

export default CustomerSearchForm;
