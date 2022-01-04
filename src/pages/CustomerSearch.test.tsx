import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CustomerSearch from './CustomerSearch';

describe('CustomerSearch Page', () => {
  it('renders the component', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomerSearch />
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders page title', () => {
    render(
      <BrowserRouter>
        <CustomerSearch />
      </BrowserRouter>
    );
    expect(screen.getByText('pages.CustomerSearch.pageTitle')).toBeDefined();
  });

  it('renders "create new customer" button', () => {
    render(
      <BrowserRouter>
        <CustomerSearch />
      </BrowserRouter>
    );
    expect(screen.getByText('pages.CustomerSearch.btnCreateCustomer')).toBeDefined();
  });
});
