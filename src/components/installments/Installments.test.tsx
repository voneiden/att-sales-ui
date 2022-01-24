import { render } from '@testing-library/react';
import Installments from './Installments';

describe('Installments', () => {
  it('renders the component', () => {
    const { container } = render(<Installments />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  // TODO: Add better tests when we fetch the actual data from API
});
