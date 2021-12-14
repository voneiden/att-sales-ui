import React from 'react';

import useSessionStorage from '../../utils/useSessionStorage';

export const sortAlphanumeric = (items: any[], sortConfig: any) => {
  items.sort((a, b) => {
    const firstValue = a[sortConfig.key].split(' ').join('');
    const secondValue = b[sortConfig.key].split(' ').join('');
    if (sortConfig.direction === 'ascending') {
      return firstValue.localeCompare(secondValue, 'fi', { numeric: true });
    }
    return secondValue.localeCompare(firstValue, 'fi', { numeric: true });
  });
  return items;
};

export const sortNumeric = (items: any[], sortConfig: any) => {
  items.sort((a, b) => {
    const firstValue = a[sortConfig.key];
    const secondValue = b[sortConfig.key];

    if (firstValue < secondValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (firstValue > secondValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  return items;
};

const SortApartments = (items: any, sessionStorageID: string) => {
  const [sortConfig, setSortConfig] = useSessionStorage({
    defaultValue: {
      key: 'apartment_number',
      direction: 'ascending',
      alphaNumeric: true,
    },
    key: `sortConfig-${sessionStorageID}`,
  });

  const sortedApartments = React.useMemo(() => {
    if (items === undefined) return [];

    const sortableApartments = [...items];

    if (sortConfig === null) return sortableApartments;

    sortConfig.alphaNumeric
      ? sortAlphanumeric(sortableApartments, sortConfig)
      : sortNumeric(sortableApartments, sortConfig);

    return sortableApartments;
  }, [items, sortConfig]);

  const requestSort = (key: string, alphaNumeric: boolean) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction, alphaNumeric });
  };

  return { sortedApartments, requestSort, sortConfig };
};

export default SortApartments;
