import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  it('renders label', () => {
    render(<Label children={'test'} />);

    expect(screen.getByText('test')).toBeDefined();
  });

  it('renders label for hitas', () => {
    render(<Label children={'test'} type={'hitas'} />);

    const elem = screen.getByText('test');

    expect(elem.classList.contains('hitas')).toBe(true);
  });

  it('renders label for haso', () => {
    render(<Label children={'test'} type={'haso'} />);

    const elem = screen.getByText('test');

    expect(elem.classList.contains('haso')).toBe(true);
  });

  it('renders label for puolihitas', () => {
    render(<Label children={'test'} type={'puolihitas'} />);

    const elem = screen.getByText('test');

    expect(elem.classList.contains('puolihitas')).toBe(true);
  });

  it('renders label with unknown type', () => {
    render(<Label children={'test'} type={'foo'} />);

    const elem = screen.getByText('test');

    expect(elem.classList.contains('foo')).toBe(false);
  });
});
