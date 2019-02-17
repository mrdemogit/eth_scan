export const formatEthValue = (value: string) =>
  value ? parseInt(value, 10) / 1000000000000000000 : 0;

const CURRENCIES_DICTIONARY: { [value: string]: string } = {
  USD: 'US Dollar',
  SGD: 'Singapore Dollar',
  JPY: 'Japanese Yen',
  EUR: 'Euro',
  KRW: 'Korean Won',
  CNY: 'Chinese Yuan',
};

export const getCurrencyName = (code: string): string =>
  CURRENCIES_DICTIONARY[code] || code;
