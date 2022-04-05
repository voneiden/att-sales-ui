import React from 'react';
import { Select } from 'hds-react';
import { useTranslation } from 'react-i18next';

const T_PATH = 'components.customers.SelectCustomerDropdown';

interface IProps {
  formId: string;
  handleFormCallback: () => void;
}

const SelectCustomerDropdown = ({ formId, handleFormCallback }: IProps): JSX.Element => {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleFormCallback(); // TODO: pass selected customer id
  };

  return (
    // TODO: Add customer search with selecting a customer
    <form id={formId} onSubmit={(e) => handleSubmit(e)}>
      <Select
        id="selectCustomer"
        label={t(`${T_PATH}.selectCustomer`)}
        placeholder={t(`${T_PATH}.searchByName`)}
        required
        options={[{ label: 'TODO' }]}
        style={{ marginBottom: '1rem' }}
      />
    </form>
  );
};

export default SelectCustomerDropdown;
