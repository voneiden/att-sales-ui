export const sortAlphanumeric = (items: any[], key: string, direction: string) => {
  items.sort((a, b) => {
    const firstValue = a[key].split(' ').join('');
    const secondValue = b[key].split(' ').join('');
    if (direction === 'ascending') {
      return firstValue.localeCompare(secondValue, 'fi', { numeric: true });
    }
    return secondValue.localeCompare(firstValue, 'fi', { numeric: true });
  });
  return items;
};

export const sortNumeric = (items: any[], key: string, direction: string) => {
  items.sort((a, b) => {
    const firstValue = a[key];
    const secondValue = b[key];

    if (firstValue < secondValue) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (firstValue > secondValue) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  return items;
};
