import formatSalesPrice from './formatSalesPrice';

test('formats sales price', () => {
  expect(formatSalesPrice(12345090)).toEqual('123\xa0450,90\xa0€');
});
