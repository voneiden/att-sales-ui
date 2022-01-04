import { renderHook } from '@testing-library/react-hooks';

import { sortAlphanumeric, sortNumeric } from './sortList';

const mockApartments = [
  { apartment_number: 'A1' },
  { apartment_number: 'B1' },
  { apartment_number: 'B2' },
  { apartment_number: 'A2' },
];

const mockApartmentsSortedAscending = [
  { apartment_number: 'A1' },
  { apartment_number: 'A2' },
  { apartment_number: 'B1' },
  { apartment_number: 'B2' },
];

const mockApartmentsSortedDescending = [
  { apartment_number: 'B2' },
  { apartment_number: 'B1' },
  { apartment_number: 'A2' },
  { apartment_number: 'A1' },
];

const mockNumeric = [{ number: '1' }, { number: '3' }, { number: '2' }];

const mockSortedNumericAscending = [{ number: '1' }, { number: '2' }, { number: '3' }];

const mockSortedNumericDescending = [{ number: '3' }, { number: '2' }, { number: '1' }];

describe('sortAlphanumeric', () => {
  it('sorts ascending', () => {
    const sortConfig = {
      key: 'apartment_number',
      direction: 'ascending',
    };
    const { result } = renderHook(() => sortAlphanumeric(mockApartments, sortConfig.key, sortConfig.direction));
    expect(result.current).toEqual(mockApartmentsSortedAscending);
  });

  it('sorts descending', () => {
    const sortConfig = {
      key: 'apartment_number',
      direction: 'descending',
    };
    const { result } = renderHook(() => sortAlphanumeric(mockApartments, sortConfig.key, sortConfig.direction));
    expect(result.current).toEqual(mockApartmentsSortedDescending);
  });
});

describe('sortNumeric', () => {
  it('sorts ascending', () => {
    const sortConfig = {
      key: 'number',
      direction: 'ascending',
    };
    const { result } = renderHook(() => sortNumeric(mockNumeric, sortConfig.key, sortConfig.direction));
    expect(result.current).toEqual(mockSortedNumericAscending);
  });

  it('sorts descending', () => {
    const sortConfig = {
      key: 'number',
      direction: 'descending',
    };
    const { result } = renderHook(() => sortNumeric(mockNumeric, sortConfig.key, sortConfig.direction));
    expect(result.current).toEqual(mockSortedNumericDescending);
  });
});
