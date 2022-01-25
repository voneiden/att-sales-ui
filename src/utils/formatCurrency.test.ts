import formattedCurrency from './formatCurrency';

test('formats currency', () => {
  expect(formattedCurrency(222333.9)).toEqual('222\xa0333,90\xa0€');
});
