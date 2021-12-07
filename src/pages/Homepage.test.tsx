import { rest } from 'msw';
import { screen } from '@testing-library/react';

import Index from './Homepage';
import { server } from '../test/server';
import { renderWithProviders } from '../test/test-utils';

describe('Homepage', () => {
  it('handles good response', async () => {
    renderWithProviders(<Index />);

    screen.getByText('Loading...');

    await screen.findByText('Taloyhtiö 30+');
    await screen.findByText('Kotikatu 32 As Oy');
    await screen.findByText('Huolintatalo');
  });

  it('handles error response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<Index />);

    screen.getByText('Loading...');

    await screen.findByText('Error while loading projects');
  });
});
