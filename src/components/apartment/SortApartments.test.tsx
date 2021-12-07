import { renderHook } from '@testing-library/react-hooks';

import SortApartments from './SortApartments';

const mockData = [
  { apartment_number: 'A1' },
  { apartment_number: 'B1' },
  { apartment_number: 'B2' },
  { apartment_number: 'A2' },
];

const mockDataSortedByApartmentNumber = [
  { apartment_number: 'A1' },
  { apartment_number: 'A2' },
  { apartment_number: 'B1' },
  { apartment_number: 'B2' },
];

describe('SortApartments', () => {
  it('default sort by apartment_number as alphanumeric in ascending order', () => {
    const { result } = renderHook(() => SortApartments(mockData, `testSort1`));
    const { sortedApartments } = result.current;
    expect(sortedApartments).toEqual(mockDataSortedByApartmentNumber);
  });
});
