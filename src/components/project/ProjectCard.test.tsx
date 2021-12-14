import React from 'react';
import { render, screen } from '@testing-library/react';

import ProjectCard from './ProjectCard';
import mockProject from '../../mocks/projects.json';
import { BrowserRouter } from 'react-router-dom';

describe('ProjectCard', () => {
  it('renders project details', () => {
    render(<ProjectCard project={mockProject[1]} />);

    expect(screen.getByText('Kotikatu 32 As Oy')).toBeDefined(); // housing_company
    expect(screen.getByText('Haso')).toBeDefined(); // ownership_type
    expect(screen.getByText('KotiKulma', { exact: false })).toBeDefined(); // district
    expect(screen.getByText('Kotikatu 32')).toBeDefined(); // street_address
  });

  it('renders project page link', () => {
    render(<ProjectCard project={mockProject[1]} renderAsLink={false} />);
    expect(screen.getByText('components.project.ProjectCard.showProject')).toBeDefined();
  });

  it('does not render project page link', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject[1]} renderAsLink />
      </BrowserRouter>
    );
    expect(screen.queryByText('components.project.ProjectCard.showProject')).toBeNull();
  });

  it('renders action buttons', () => {
    render(<ProjectCard project={mockProject[1]} renderAsLink={false} showActions />);
    expect(screen.getByText('components.project.ProjectCard.startLottery')).toBeDefined();
    expect(screen.getByText('components.project.ProjectCard.downloadLotteryResults', { exact: false })).toBeDefined();
  });
});
