import { CURRENCIES } from '../../constants';
import { EXCHANGE_FEE } from '../../constants';

export const validateValueFormat = (val: string) => {
  return /^\d{0,16}\.?\d{0,2}$/.test(val);
};

export const validateMinValue = (val: [string, string]) => {
  return parseFloat(val[0]) >= 0.1;
};

export const validateBalance = (balances, currency: [string, string], value: [string, string]) => {
  return balances[currency[0]] > parseFloat(value[0]);
};

export const canExchange = (balances, currency: [string, string], value: [string, string]) => {
  return !!value[0] && !!value[1] && validateBalance(balances, currency, value) && validateMinValue(value);
};

export const getExchangeFee = (rates, currency: string, val: string, freeLimit: number) => {
  // get limit in current currency (origin GBP)
  const limit = currency === 'GBP' ? freeLimit : rates['GBP'][currency] * freeLimit;
  const diff = parseFloat(val) - limit;
  if (diff <= 0) {
    return 0;
  }
  // no free food
  return Math.round(diff * EXCHANGE_FEE * 100) / 100;
};

export const deductExchangeFee = (rates, currency: string, val: string, freeLimit: number) => {
  const vGbp = currency === 'GBP' ? parseFloat(val) : rates['GBP'][currency] * parseFloat(val);
  return Math.max(freeLimit - vGbp, 0);
};

export const getCurrencySymbol = (currency: string) => {
  if (!currency) {
    return '';
  }
  return (CURRENCIES.find(f => f.value === currency) || {}).symbol || '';
};

export const addSign = (val: string, canBalanceExceed?: boolean) => {
  if (!val) {
    return val;
  }
  return `${canBalanceExceed ? '-' : '+'}${val}`;
};

export const removeSign = (val: string) => {
  return val[0] === '+' || val[0] === '-' ? val.substr(1, val.length) : val;
};
