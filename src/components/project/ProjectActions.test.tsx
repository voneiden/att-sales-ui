import { render, screen } from '@testing-library/react';

import ProjectActions from './ProjectActions';

describe('ProjectActions', () => {
  it('renders ProjectActions component', () => {
    const { container } = render(<ProjectActions />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders create buyer mailing list button lottery is completed', () => {
    render(<ProjectActions lotteryCompleted />);
    expect(screen.getByText('components.project.ProjectActions.createBuyerMailingList')).toBeDefined();
  });

  it('renders download lottery results button when lottery is completed', () => {
    render(<ProjectActions lotteryCompleted />);
    expect(screen.getByText('components.project.ProjectActions.downloadLotteryResults')).toBeDefined();
  });

  it('renders download applicant list button when lottery is not yet completed', () => {
    render(<ProjectActions lotteryCompleted={false} />);
    expect(screen.getByText('components.project.ProjectActions.downloadApplicantList')).toBeDefined();
  });
});
