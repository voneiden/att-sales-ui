import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen', () => {
  it('renders the component', () => {
    const { container } = render(<LoadingScreen />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('renders loading message', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('common.loadingScreen.LoadingScreen.loading...')).toBeDefined();
  });
});
