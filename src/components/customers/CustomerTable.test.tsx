import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import CustomerTable from './CustomerTable';
import mockCustomers from '../../mocks/customers.json';
import { Customer } from '../../types';

const customers = mockCustomers as Customer[];

describe('CustomerTable', () => {
  it('renders CustomerTable component', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomerTable />
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders table header elements', () => {
    render(
      <BrowserRouter>
        <CustomerTable customers={customers} isLoading={false} isSuccess hasSearchQuery />
      </BrowserRouter>
    );

    expect(screen.getAllByText('components.customers.CustomerTable.customer')).toBeDefined();
  });
});
