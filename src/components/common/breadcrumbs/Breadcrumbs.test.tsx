import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';

const breadcrumbAncestors = [
  {
    label: 'ancestor page 1',
    path: '/',
  },
  {
    label: 'ancestor page 2',
    path: '/',
  },
];

describe('Breadcrumbs', () => {
  it('renders Breadcrumbs', () => {
    render(<Breadcrumbs ancestors={breadcrumbAncestors} current="current page" />);

    expect(screen.getByText('ancestor page 1')).toBeDefined();
    expect(screen.getByText('ancestor page 2')).toBeDefined();
    expect(screen.getByText('current page')).toBeDefined();
  });
});
