import { screen } from '@testing-library/react';
import CustomerReservations from './CustomerReservations';
import { renderWithProviders } from '../../test/test-utils';

describe('CustomerReservations', () => {
  it('renders the component', () => {
    renderWithProviders(<CustomerReservations />);
    expect(screen.getAllByText('components.customers.CustomerReservations.position', { exact: false })).toBeDefined();
  });

  // TODO: Add better tests when we fetch the actual data from API
});
