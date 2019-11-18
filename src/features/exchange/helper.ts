import Big from 'big.js';

import { CURRENCIES } from '../../constants';
import { EXCHANGE_FEE } from '../../constants';
import Rates from './Rates';
import { PocketType } from './PocketType';
import Balances from './Balances';
import Pockets from './Pockets';
import Pocket from './Pocket';

export const validateValueFormat = (val: string): boolean => {
  return /^\d{0,14}\.?\d{0,2}$/.test(val);
};

export const validateMinValue = (pocket: Pocket): boolean => {
  return pocket.amount.gte(0.1);
};

export const validateBalance = (balances: Balances, pockets: Pockets): boolean => {
  const from = pockets[PocketType.From];
  return balances[from.currency].gte(from.amount);
};

export const deductBalances = (balances: Balances, pockets: Pockets): Balances => {
  const newBalances = { ...balances };
  const from = pockets[PocketType.From];
  const to = pockets[PocketType.To];

  if (validateBalance(balances, pockets)) {
    newBalances[from.currency] = newBalances[from.currency].minus(from.amount);
    newBalances[to.currency] = newBalances[to.currency].plus(to.amount);
  }

  return newBalances;
};

export const canExchange = (balances: Balances, pockets: Pockets): boolean => {
  return (
    pockets[PocketType.From].amount.gt(0) &&
    pockets[PocketType.To].amount.gt(0) &&
    validateBalance(balances, pockets) &&
    validateMinValue(pockets[PocketType.From])
  );
};

export const getExchangeFee = (rates: Rates, freeLimit: Big, pocket: Pocket): Big => {
  // get limit in current currency (origin GBP)
  const limit = pocket.currency === 'GBP' ? freeLimit : freeLimit.mul(rates['GBP'][pocket.currency]);
  const diff = new Big(pocket.amount).minus(limit);
  if (diff.lte(0)) {
    return new Big(0);
  }
  return diff.mul(EXCHANGE_FEE).round(2, 3);
};

export const deductExchangeFee = (rates: Rates, freeLimit: Big, pocket: Pocket): Big => {
  const fee = getExchangeFee(rates, freeLimit, pocket);
  const result = freeLimit.minus(fee);
  return result.gt(0) ? result : Big(0);
};

export const getCurrencySymbol = (currency: string) => {
  if (!currency) {
    return '';
  }
  return (CURRENCIES.find(f => f.value === currency) || {}).symbol || '';
};

export const addSign = (val: string, pocketType: PocketType) => {
  if (!val) {
    return val;
  }
  return `${pocketType === PocketType.From ? '-' : '+'}${val}`;
};

export const removeSign = (val: string) => {
  return val[0] === '+' || val[0] === '-' ? val.substr(1, val.length) : val;
};

export const exchangeInPockets = (pt: PocketType, rates: Rates, pockets: Pockets): Pockets => {
  const newPockets = { ...pockets };

  const opt = pt === PocketType.From ? PocketType.To : PocketType.From;

  if (newPockets[pt].input) {
    const rate = rates[pockets[pt].currency][pockets[opt].currency];
    newPockets[pt].amount = new Big(newPockets[pt].input);
    // no free food
    newPockets[opt].amount = newPockets[pt].amount.mul(rate);
    const rm = pt === PocketType.To ? 3 : 0;
    newPockets[opt].amount = newPockets[opt].amount.round(2, rm);
    newPockets[opt].input = newPockets[opt].amount.toFixed(2);
  }
  return newPockets;
};

export const mapRates = ({ USD, GBP }): Rates => {
  const usd = new Big(USD);
  const gbp = new Big(GBP);
  return {
    EUR: {
      USD: usd,
      GBP: gbp,
    },
    GBP: {
      EUR: new Big(1).div(gbp),
      USD: usd.div(gbp),
    },
    USD: {
      EUR: new Big(1).div(usd),
      GBP: gbp.div(usd),
    },
  };
};
