import { screen } from '@testing-library/react';

import InstallmentsForm from './InstallmentsForm';
import dummyReservation from '../../mocks/apartment_reservation.json';
import { renderWithProviders } from '../../test/test-utils';
import { ApartmentReservationWithInstallments } from '../../types';

const reservation = dummyReservation as ApartmentReservationWithInstallments;

describe('InstallmentsForm', () => {
  it('renders the component', () => {
    const { container } = renderWithProviders(
      <InstallmentsForm
        reservationId={reservation.id}
        installments={reservation.installments}
        installmentCandidates={reservation.installment_candidates}
        targetPrice={0}
      />
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders table header elements', () => {
    renderWithProviders(
      <InstallmentsForm
        reservationId={reservation.id}
        installments={reservation.installments}
        installmentCandidates={reservation.installment_candidates}
        targetPrice={0}
      />
    );
    expect(screen.getAllByText('components.installments.InstallmentsForm.installmentType')).toBeDefined();
    expect(screen.getAllByText('components.installments.InstallmentsForm.sum', { exact: false })).toBeDefined();
    expect(screen.getAllByText('components.installments.InstallmentsForm.dueDate')).toBeDefined();
    expect(screen.getAllByText('components.installments.InstallmentsForm.IbanAccountNumber')).toBeDefined();
    expect(screen.getAllByText('components.installments.InstallmentsForm.referenceNumber')).toBeDefined();
    expect(screen.getAllByText('components.installments.InstallmentsForm.sentToSAP')).toBeDefined();
  });

  it('renders installment candidates table info text', () => {
    renderWithProviders(
      <InstallmentsForm
        reservationId={reservation.id}
        installments={reservation.installments}
        installmentCandidates={reservation.installment_candidates}
        targetPrice={0}
      />
    );
    expect(screen.getByText('components.installments.InstallmentsForm.installmentCandidateTableText')).toBeDefined();
  });

  it('renders table tbody', () => {
    renderWithProviders(
      <InstallmentsForm
        reservationId={reservation.id}
        installments={reservation.installments}
        installmentCandidates={reservation.installment_candidates}
        targetPrice={0}
      />
    );
    expect(screen.queryByDisplayValue('reference-1')).toBeInTheDocument();
  });

  it('renders table footer', () => {
    renderWithProviders(
      <InstallmentsForm
        reservationId={reservation.id}
        installments={reservation.installments}
        installmentCandidates={reservation.installment_candidates}
        targetPrice={0}
      />
    );
    expect(screen.getByText('components.installments.InstallmentsForm.total')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.salesPrice', { exact: false })).toBeDefined();
  });
});
