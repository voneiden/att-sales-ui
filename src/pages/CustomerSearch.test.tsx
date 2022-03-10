import { rest } from 'msw';
import { screen } from '@testing-library/react';

import CustomerSearch from './CustomerSearch';
import { server } from '../test/server';
import { renderWithProviders } from '../test/test-utils';

describe('CustomerSearch Page', () => {
  it('handles good response', async () => {
    renderWithProviders(<CustomerSearch />);

    await screen.findByText('pages.CustomerSearch.pageTitle');
    await screen.findByText('pages.CustomerSearch.btnCreateCustomer');
    await screen.findByText('components.customers.CustomerTable.noSearchQuery');
  });

  it('handles error response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/customers`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CustomerSearch />);

    await screen.findByText('pages.CustomerSearch.errorLoadingCustomers');
  });
});
