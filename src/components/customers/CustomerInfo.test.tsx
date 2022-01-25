import { render, screen } from '@testing-library/react';
import CustomerInfo from './CustomerInfo';

import dummyCustomers from '../../mocks/customers.json';

const customerWithCoApplicant = dummyCustomers[0];
const customerWithoutCoApplicant = dummyCustomers[2];

describe('CustomerInfo', () => {
  it('renders the component', () => {
    const { container } = render(<CustomerInfo />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders null without assigned customer', () => {
    render(<CustomerInfo customer={undefined} />);
    expect(screen.getByText('components.customers.CustomerInfo.errorNoCustomer')).toBeDefined();
  });

  it('renders customer details', () => {
    render(<CustomerInfo customer={customerWithCoApplicant} />);
    expect(screen.queryAllByText('components.customers.CustomerInfo.contactDetails')).toBeDefined();
  });

  it('renders customer co-applicant details', () => {
    render(<CustomerInfo customer={customerWithCoApplicant} />);
    expect(screen.getByText('components.customers.CustomerInfo.coApplicant')).toBeDefined();
  });

  it('does not render non-existent co-applicant details', () => {
    render(<CustomerInfo customer={customerWithoutCoApplicant} />);
    expect(screen.queryByText('components.customers.CustomerInfo.coApplicant')).toBeNull();
  });
});
