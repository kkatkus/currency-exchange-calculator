export const validateValueFormat = (val: string) => {
  return /^\d*\.?\d{0,2}$/.test(val);
};

export const validateMinValue = (val: [string, string]) => {
  return parseFloat(val[0]) >= 0.1;
};

export const validateBalance = (balances, currency, value) => {
  return balances[currency[0]] > parseFloat(value[0]);
};

export const canExchange = (balances, currency, value) => {
  return !!value[0] && !!value[1] && validateBalance(balances, currency, value) && validateMinValue(value);
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
