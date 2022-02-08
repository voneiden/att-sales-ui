import { screen } from '@testing-library/react';
import CustomerDetail from './CustomerDetail';
import { renderWithProviders } from '../test/test-utils';

describe('CustomerDetail Page', () => {
  it('renders the component', () => {
    renderWithProviders(<CustomerDetail />);
    expect(screen.getAllByText('pages.CustomerDetail.customerDetails', { exact: false })).toBeDefined();
  });

  // TODO: Add better tests when we fetch the actual data from API
});
