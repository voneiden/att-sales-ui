import { render, screen } from '@testing-library/react';
import InstallmentsForm from './InstallmentsForm';

describe('InstallmentsForm', () => {
  it('renders the component', () => {
    const { container } = render(<InstallmentsForm />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders table header elements', () => {
    render(<InstallmentsForm />);
    expect(screen.getByText('components.installments.InstallmentsForm.installmentType')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.sum', { exact: false })).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.dueDate')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.IbanAccountNumber')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.referenceNumber')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.sentToSAP')).toBeDefined();
  });

  it('renders table footer', () => {
    render(<InstallmentsForm />);
    expect(screen.getByText('components.installments.InstallmentsForm.total')).toBeDefined();
    expect(screen.getByText('components.installments.InstallmentsForm.salesPrice', { exact: false })).toBeDefined();
  });

  // TODO: Better tests when we have data
});
