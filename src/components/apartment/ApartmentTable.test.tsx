import { render, screen } from '@testing-library/react';

import ApartmentTable from './ApartmentTable';
import mockProject from '../../mocks/project.json';
import { Apartment } from '../../types';

const apartments = mockProject.apartments as Apartment[];

describe('ApartmentTable', () => {
  it('renders ApartmentTable component', () => {
    const { container } = render(<ApartmentTable />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders table header elements', () => {
    render(<ApartmentTable apartments={apartments} isLoading={false} isError={false} isSuccess={true} projectId={1} />);

    expect(screen.getAllByText('components.apartment.ApartmentTable.apartment')).toBeDefined();
  });
});
