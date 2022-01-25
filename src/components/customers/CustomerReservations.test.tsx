import { render } from '@testing-library/react';
import CustomerReservations from './CustomerReservations';

describe('CustomerReservations', () => {
  it('renders the component', () => {
    const { container } = render(<CustomerReservations />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  // TODO: Add better tests when we fetch the actual data from API
});
