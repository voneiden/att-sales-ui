import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ApartmentTable from './ApartmentTable';
import mockProject from '../../mocks/project.json';
import { Apartment } from '../../types';

const apartments: Apartment[] = mockProject.apartments;

describe('ApartmentTable', () => {
  it('renders ApartmentTable component', () => {
    const { container } = render(
      <BrowserRouter>
        <ApartmentTable />
      </BrowserRouter>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders table header elements', () => {
    render(
      <BrowserRouter>
        <ApartmentTable apartments={apartments} isLoading={false} isError={false} isSuccess={true} projectId={1} />
      </BrowserRouter>
    );

    expect(screen.getAllByText('components.apartment.ApartmentTable.apartment')).toBeDefined();
  });
});
