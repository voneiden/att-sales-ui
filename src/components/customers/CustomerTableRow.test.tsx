import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import CustomerTableRow from './CustomerTableRow';
import mockCustomers from '../../mocks/customers.json';
import { Customer } from '../../types';

const customer = mockCustomers[0] as Customer;

describe('CustomerTableRow', () => {
  it('renders CustomerTableRow component', () => {
    const { container } = render(
      <BrowserRouter>
        <table>
          <tbody>
            <CustomerTableRow />
          </tbody>
        </table>
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders customer table cell data', () => {
    render(
      <BrowserRouter>
        <table>
          <tbody>
            <CustomerTableRow customer={customer} />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.getAllByText('Meikäläinen, Matti')).toBeDefined();
    expect(screen.getAllByText('matti.meikalainen@example.com')).toBeDefined();
    expect(screen.getAllByText('+358501234567')).toBeDefined();
    expect(screen.getAllByText('Meikäläinen, Maija')).toBeDefined();
  });
});
