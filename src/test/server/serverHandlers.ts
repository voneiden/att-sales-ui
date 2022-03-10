import { rest } from 'msw';

import mockProjects from '../../mocks/projects.json';
import mockProject from '../../mocks/project.json';
import mockApartments from '../../mocks/apartments.json';
import mockCustomer from '../../mocks/customer.json';
import mockCustomers from '../../mocks/customers.json';
import mockApartmentReservation from '../../mocks/apartment_reservation.json';

const handlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/apartments`, (req, res, ctx) => {
    return res(ctx.json([mockApartments[0]]));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, (req, res, ctx) => {
    return res(ctx.json(mockProjects));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/projects/:projectId`, (req, res, ctx) => {
    return res(ctx.json(mockProject));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/customers/:customerId`, (req, res, ctx) => {
    return res(ctx.json(mockCustomer));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/customers`, (req, res, ctx) => {
    return res(ctx.json(mockCustomers));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/apartment_reservations/:reservationId`, (req, res, ctx) => {
    return res(ctx.json(mockApartmentReservation));
  }),
];

export { handlers };
