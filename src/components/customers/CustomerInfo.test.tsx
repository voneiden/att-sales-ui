import { render, screen } from '@testing-library/react';
import CustomerInfo from './CustomerInfo';

import dummyCustomer from '../../mocks/customer.json';

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
    render(<CustomerInfo customer={dummyCustomer} />);
    expect(screen.queryAllByText('components.customers.CustomerInfo.contactDetails')).toBeDefined();
  });

  it('renders customer co-applicant details', () => {
    render(<CustomerInfo customer={dummyCustomer} />);
    expect(screen.getByText('components.customers.CustomerInfo.coApplicant')).toBeDefined();
  });

  const customerWithoutCoApplicant = { ...dummyCustomer, secondary_profile: null };

  it('does not render non-existent co-applicant details', () => {
    render(<CustomerInfo customer={customerWithoutCoApplicant} />);
    expect(screen.queryByText('components.customers.CustomerInfo.coApplicant')).toBeNull();
  });
});
