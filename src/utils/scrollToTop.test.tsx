import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ScrollToTop from './scrollToTop';

global.scrollTo = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedNavigate,
}));

describe('ScrollToTop', () => {
  it('calls window.scrollTo', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
