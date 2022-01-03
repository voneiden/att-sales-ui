import { render, screen } from '@testing-library/react';

import ApartmentActions from './ApartmentActions';

describe('ApartmentActions', () => {
  it('renders ApartmentActions component', () => {
    const { container } = render(<ApartmentActions />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders select element label', () => {
    render(<ApartmentActions />);
    expect(screen.getByText('components.apartment.ApartmentActions.show')).toBeDefined();
  });

  it('renders action button label', () => {
    render(<ApartmentActions />);
    expect(screen.getByText('components.apartment.ApartmentActions.action')).toBeDefined();
  });
});
