import React from 'react';
import { render } from '@testing-library/react';
import ApartmentActions from './ApartmentActions';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

test('renders ApartmentTable component', () => {
  const { container } = render(<ApartmentActions />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});
