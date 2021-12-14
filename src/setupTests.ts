// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { server } from './test/server';

beforeAll(() => {
  // Enable API mocking before tests.
  server.listen({ onUnhandledRequest: 'error' });
  // Set up enzyme
  Enzyme.configure({ adapter: new Adapter() });
});

// Mock localstorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store = new Map();
    return {
      getItem(key: string): string {
        return store.get(key);
      },
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      clear: () => {
        store = new Map();
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

afterEach(() => {
  // Reset any runtime request handlers we may add during the tests.
  server.resetHandlers();
  // Clear localstorage values
  window.localStorage.clear();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());
