import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ApartmentRow from './ApartmentRow';
import mockProject from '../../mocks/project.json';
import { Apartment } from '../../types';

const mockApartment: Apartment = mockProject.apartments[0];

describe('ApartmentRow', () => {
  it('renders ApartmentRow component', () => {
    const { container } = render(
      <BrowserRouter>
        <ApartmentRow apartment={mockApartment} />
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders apartment details', () => {
    render(
      <BrowserRouter>
        <ApartmentRow apartment={mockApartment} />
      </BrowserRouter>
    );

    expect(screen.queryByText('A1')).not.toBeNull(); // apartment_number
    expect(screen.queryByText('4h+kt+s')).not.toBeNull(); // apartment_structure
  });
});
