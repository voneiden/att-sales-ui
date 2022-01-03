import { render, screen } from '@testing-library/react';

import ApartmentRow from './ApartmentRow';
import mockApartments from '../../mocks/apartments.json';
import { Apartment } from '../../types';

const mockApartment = mockApartments[0] as Apartment;

describe('ApartmentRow', () => {
  it('renders ApartmentRow component', () => {
    const { container } = render(<ApartmentRow apartment={mockApartment} />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders apartment details', () => {
    render(<ApartmentRow apartment={mockApartment} />);

    expect(screen.queryByText('A1')).not.toBeNull(); // apartment_number
    expect(screen.queryByText('4h+kt+s')).not.toBeNull(); // apartment_structure
  });
});
