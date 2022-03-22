import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the component', () => {
    const { container } = render(<Spinner />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });
});
