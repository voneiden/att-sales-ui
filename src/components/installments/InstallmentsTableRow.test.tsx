import { render, screen } from '@testing-library/react';
import InstallmentsTableRow from './InstallmentsTableRow';

import dummyInstallments from '../../mocks/apartment_installments.json';
import { ApartmentInstallment } from '../../types';

const installment = dummyInstallments[0] as ApartmentInstallment;

describe('InstallmentsTableRow', () => {
  it('renders InstallmentsTableRow component', () => {
    const { container } = render(
      <table>
        <tbody>
          <InstallmentsTableRow installment={installment} />
        </tbody>
      </table>
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders installment details', () => {
    render(
      <table>
        <tbody>
          <InstallmentsTableRow installment={installment} />
        </tbody>
      </table>
    );
    expect(screen.getByText('ENUMS.InstallmentTypes.DOWN_PAYMENT')).toBeDefined();
    expect(screen.getByText('18.1.2025')).toBeDefined();
    expect(screen.getByText('FI90 5345 4353 4012 10')).toBeDefined();
    expect(screen.getByText('1231231 3123123')).toBeDefined();
  });

  it('renders send to SAP button', () => {
    render(
      <table>
        <tbody>
          <InstallmentsTableRow installment={installment} />
        </tbody>
      </table>
    );
    expect(screen.getByText('components.installments.InstallmentsTableRow.sendToSAP')).toBeDefined();
  });
});
