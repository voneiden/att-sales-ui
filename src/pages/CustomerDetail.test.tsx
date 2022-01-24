import { render } from '@testing-library/react';
import CustomerDetail from './CustomerDetail';

describe('CustomerDetail Page', () => {
  it('renders the component', () => {
    const { container } = render(<CustomerDetail />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  // TODO: Add better tests when we fetch the actual data from API
});
