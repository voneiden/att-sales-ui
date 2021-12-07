import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders Container with children', () => {
    render(<Container>test</Container>);
    expect(screen.getByText('test')).toBeDefined();
  });

  it('renders narrow container', () => {
    render(<Container narrow>test</Container>);
    const elem = screen.getByText('test');
    expect(elem.classList.contains('narrow')).toBe(true);
  });

  it('renders wide container', () => {
    render(<Container wide>test</Container>);
    const elem = screen.getByText('test');
    expect(elem.classList.contains('wide')).toBe(true);
  });
});
