import { render, screen } from '@testing-library/react';
import StatusText from './StatusText';

describe('StatusText', () => {
  it('renders StatusText', () => {
    render(<StatusText>test</StatusText>);

    expect(screen.getByText('test')).toBeDefined();
  });
});
