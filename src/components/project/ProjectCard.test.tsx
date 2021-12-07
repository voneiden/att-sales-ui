import React from 'react';
import { render, screen } from '@testing-library/react';

import ProjectCard from './ProjectCard';
import mockProject from '../../mocks/projects.json';

describe('ProjectCard', () => {
  it('renders project details', () => {
    render(<ProjectCard project={mockProject[1]} />);

    expect(screen.getByText('Kotikatu 32 As Oy')).toBeDefined(); // housing_company
    expect(screen.getByText('Haso')).toBeDefined(); // ownership_type
    expect(screen.getByText('KotiKulma', { exact: false })).toBeDefined(); // district
    expect(screen.getByText('Kotikatu 32')).toBeDefined(); // street_address
  });

  it('renders project page link', () => {
    render(<ProjectCard project={mockProject[1]} />);
    expect(screen.getByText('components.project.ProjectCard.showProject')).toBeDefined();
  });
});
