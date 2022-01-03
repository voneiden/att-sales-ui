import { rest } from 'msw';
import { screen } from '@testing-library/react';

import Index from './Homepage';
import { server } from '../test/server';
import { renderWithProviders } from '../test/test-utils';

describe('Homepage', () => {
  it('handles good response', async () => {
    // show all projects
    window.localStorage.setItem('showMyProjects', 'false');

    renderWithProviders(<Index />);

    screen.getByText('pages.Homepage.loading...');

    await screen.findByText('Taloyhtiö 30+');
    await screen.findByText('Kotikatu 32 As Oy');
  });

  it('handles error response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<Index />);

    screen.getByText('pages.Homepage.loading...');

    await screen.findByText('pages.Homepage.errorLoadingProjects');
  });

  it('handles empty response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    renderWithProviders(<Index />);

    screen.getByText('pages.Homepage.loading...');

    await screen.findByText('pages.Homepage.noAssignedProjects');
  });

  it('handles undefined response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.json(undefined));
      })
    );

    renderWithProviders(<Index />);

    screen.getByText('pages.Homepage.loading...');

    await screen.findByText('pages.Homepage.noProjects');
  });
});
