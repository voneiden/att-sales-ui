import { rest } from 'msw';

import mockProjects from '../../mocks/projects.json';
import mockApartments from '../../mocks/apartments.json';

const handlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/apartments`, (req, res, ctx) => {
    return res(ctx.json([mockApartments[0]]));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
    return res(ctx.json(mockProjects));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects/:projectId`, (req, res, ctx) => {
    return res(ctx.json(mockProjects[0]));
  }),
];

export { handlers };
