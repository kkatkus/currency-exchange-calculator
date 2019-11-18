import { EXCHANGE_RATE_FETCH_SUCCESS, EXCHANGE_RATE_FETCH_FAIL, EXCHANGE_UPDATE } from '../../actions';
import { CURRENCIES } from '../../constants';
import { PocketType } from './PocketType';
import Pockets from './Pockets';

import Big from 'big.js';

export const defaultExchangeState = {
  loading: true,
  rates: {},
  freeLimit: new Big(5000),
  balances: { EUR: new Big(50000), GBP: new Big(6000), USD: new Big(500) },
  activePocket: PocketType.From,
  pockets: {
    [PocketType.From]: {
      currency: CURRENCIES[0].value,
      symbol: CURRENCIES[0].symbol,
      input: '',
      amount: new Big(0),
    },
    [PocketType.To]: {
      currency: CURRENCIES[1].value,
      symbol: CURRENCIES[1].symbol,
      input: '',
      amount: new Big(0),
    },
  } as Pockets,
};

const exchangeReducer = (state = defaultExchangeState, action) => {
  switch (action.type) {
    case EXCHANGE_UPDATE:
      return { ...state, ...action.payload };
    case EXCHANGE_RATE_FETCH_SUCCESS:
      return { ...state, rates: action.payload, loading: false };
    case EXCHANGE_RATE_FETCH_FAIL:
      return { ...state, error: action.payload, loading: false };
    default: {
      return state;
    }
  }
};

export default exchangeReducer;
