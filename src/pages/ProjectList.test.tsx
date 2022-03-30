import { rest } from 'msw';
import { screen } from '@testing-library/react';

import ProjectList from './ProjectList';
import { server } from '../test/server';
import { renderWithProviders } from '../test/test-utils';

describe('ProjectList', () => {
  it('handles good response', async () => {
    // show all projects
    window.localStorage.setItem('showMyProjects', 'false');

    renderWithProviders(<ProjectList />);

    screen.getByText('pages.ProjectList.loading...');

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

    renderWithProviders(<ProjectList />);

    screen.getByText('pages.ProjectList.loading...');

    await screen.findByText('pages.ProjectList.errorLoadingProjects');
  });

  it('handles empty response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    renderWithProviders(<ProjectList />);

    screen.getByText('pages.ProjectList.loading...');

    await screen.findByText('pages.ProjectList.noAssignedProjects');
  });

  it('handles undefined response', async () => {
    // force msw to return error response
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
        return res(ctx.json(undefined));
      })
    );

    renderWithProviders(<ProjectList />);

    screen.getByText('pages.ProjectList.loading...');

    await screen.findByText('pages.ProjectList.noProjects');
  });
});
