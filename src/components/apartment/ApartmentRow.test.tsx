import React from 'react';
import { render, screen } from '@testing-library/react';

import ApartmentRow from './ApartmentRow';
import { Apartment } from '../../types';
import mockApartments from '../../mocks/apartments.json';

const mockApartment = mockApartments[0] as Apartment;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders ApartmentRow component', () => {
  const { container } = render(<ApartmentRow apartment={mockApartment} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<ApartmentRow apartment={mockApartment} />);

  expect(screen.queryByText('A1')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('4h+kt+s')).not.toBeNull(); // apartment_structure
});
