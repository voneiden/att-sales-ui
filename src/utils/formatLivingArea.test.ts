import formatLivingArea from './formatLivingArea';

test('formats living area', () => {
  expect(formatLivingArea(100)).toEqual('100 m\u00b2');
});
