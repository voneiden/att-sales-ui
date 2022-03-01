import { render, screen } from '@testing-library/react';

import ApartmentActions from './ApartmentActions';

describe('ApartmentActions', () => {
  it('renders ApartmentActions component', () => {
    const { container } = render(<ApartmentActions />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders select element label when lottery is completed', () => {
    render(<ApartmentActions lotteryCompleted />);
    expect(screen.getByText('components.apartment.ApartmentActions.show')).toBeDefined();
  });

  it('renders download lottery results button when lottery is completed', () => {
    render(<ApartmentActions lotteryCompleted />);
    expect(screen.getByText('components.apartment.ApartmentActions.downloadLotteryResults')).toBeDefined();
  });

  it('renders download applicant list button when lottery is not yet completed', () => {
    render(<ApartmentActions lotteryCompleted={false} />);
    expect(screen.getByText('components.apartment.ApartmentActions.downloadApplicantList')).toBeDefined();
  });
});
