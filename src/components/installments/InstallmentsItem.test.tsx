import { render, screen } from '@testing-library/react';
import InstallmentsItem from './InstallmentsItem';

import dummyProjects from '../../mocks/projects.json';
import dummyApartments from '../../mocks/apartments.json';
import dummyInstallments from '../../mocks/apartment_installments.json';
import { Apartment, ApartmentInstallment, Project } from '../../types';

const apartment = dummyApartments[0] as Apartment;
const HitasProject = dummyProjects[0] as Project;
const HasoProject = dummyProjects[1] as Project;
const installments = dummyInstallments as ApartmentInstallment[];
const emptyInstallments = [] as any; // One without installments

describe('InstallmentsItem', () => {
  it('renders apartment details', () => {
    render(<InstallmentsItem project={HitasProject} apartment={apartment} installments={installments} />);
    expect(screen.getByText('A1')).toBeDefined(); // apartment_number
    expect(screen.getByText('4h+kt+s', { exact: false })).toBeDefined(); // apartment_structure
  });

  it('renders Hitas prices for apartments', () => {
    render(<InstallmentsItem project={HitasProject} apartment={apartment} installments={installments} />);
    expect(screen.getByText('components.installments.InstallmentsItem.salesPrice')).toBeDefined();
    expect(
      screen.getByText('components.installments.InstallmentsItem.debtFreeSalesPrice', { exact: false })
    ).toBeDefined();
  });

  it('renders HASO prices for apartments', () => {
    render(<InstallmentsItem project={HasoProject} apartment={apartment} installments={installments} />);
    expect(screen.getByText('components.installments.InstallmentsItem.rightOfOccupancyPayment')).toBeDefined();
  });

  it('renders create installments button when no installments', () => {
    render(<InstallmentsItem project={HitasProject} apartment={apartment} installments={emptyInstallments} />);
    expect(screen.getByText('components.installments.InstallmentsItem.createInstallments')).toBeDefined();
  });

  it('renders edit installments button when there is installments', () => {
    render(<InstallmentsItem project={HitasProject} apartment={apartment} installments={installments} />);
    expect(screen.getByText('components.installments.InstallmentsItem.editInstallments')).toBeDefined();
  });
});
