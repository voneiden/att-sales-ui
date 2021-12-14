import { act, renderHook } from '@testing-library/react-hooks';

import SortApartments, { sortAlphanumeric, sortNumeric } from './SortApartments';

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

describe('SortApartments', () => {
  it('default sort by apartment_number as alphanumeric in ascending order', () => {
    const { result } = renderHook(() => SortApartments(mockApartments, `testSort1`));
    const { sortedApartments } = result.current;
    expect(sortedApartments).toEqual(mockApartmentsSortedAscending);
  });

  it('sort by apartment_number as alphanumeric in descending order', () => {
    const { result } = renderHook(() => SortApartments(mockApartments, `testSort2`));
    act(() => {
      // request current sort again to switch from ascending to descending
      result.current.requestSort('apartment_number', true);
    });
    const { sortedApartments } = result.current;
    expect(sortedApartments).toEqual(mockApartmentsSortedDescending);
  });
});

describe('sortAlphanumeric', () => {
  it('sorts ascending', () => {
    const sortConfig = {
      key: 'apartment_number',
      direction: 'ascending',
    };
    const { result } = renderHook(() => sortAlphanumeric(mockApartments, sortConfig));
    expect(result.current).toEqual(mockApartmentsSortedAscending);
  });

  it('sorts descending', () => {
    const sortConfig = {
      key: 'apartment_number',
      direction: 'descending',
    };
    const { result } = renderHook(() => sortAlphanumeric(mockApartments, sortConfig));
    expect(result.current).toEqual(mockApartmentsSortedDescending);
  });
});

describe('sortNumeric', () => {
  it('sorts ascending', () => {
    const sortConfig = {
      key: 'number',
      direction: 'ascending',
    };
    const { result } = renderHook(() => sortNumeric(mockNumeric, sortConfig));
    expect(result.current).toEqual(mockSortedNumericAscending);
  });

  it('sorts descending', () => {
    const sortConfig = {
      key: 'number',
      direction: 'descending',
    };
    const { result } = renderHook(() => sortNumeric(mockNumeric, sortConfig));
    expect(result.current).toEqual(mockSortedNumericDescending);
  });
});
