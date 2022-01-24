import formattedCurrency from './formatCurrency';

export const formattedSalesPrice = (value: number) => {
  return formattedCurrency(value / 100);
};

export default formattedSalesPrice;
