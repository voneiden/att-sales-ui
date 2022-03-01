import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ApartmentBaseDetails from './ApartmentBaseDetails';
import mockProject from '../../mocks/project.json';
import { Apartment } from '../../types';

const mockApartment: Apartment = mockProject.apartments[0];

describe('ApartmentBaseDetails', () => {
  it('renders ApartmentBaseDetails component', () => {
    const { container } = render(
      <BrowserRouter>
        <ApartmentBaseDetails apartment={mockApartment} />
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders apartment details', () => {
    render(
      <BrowserRouter>
        <ApartmentBaseDetails apartment={mockApartment} isLotteryResult showState />
      </BrowserRouter>
    );

    expect(screen.queryByText('A1')).not.toBeNull(); // apartment_number
    expect(screen.queryByText('4h+kt+s')).not.toBeNull(); // apartment_structure
  });
});
