import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { EXCHANGE_RATE_FETCH_INIT, EXCHANGE_RATE_FETCH_SUCCESS, EXCHANGE_RATE_FETCH_FAIL } from '../../actions';
import ExchangeRates from './ExchangeRates';

function* getExchangeRate() {
  try {
    const response = yield axios.get(`https://api.exchangeratesapi.io/latest?base=EUR`);
    const rates: ExchangeRates = {
      EUR: {
        USD: response.data.rates.USD,
        GBP: response.data.rates.GBP,
      },
      GBP: {
        EUR: Math.round((1 / response.data.rates.GBP) * 1000000) / 1000000,
        USD: Math.round((response.data.rates.USD / response.data.rates.GBP) * 1000000) / 1000000,
      },
      USD: {
        EUR: Math.round((1 / response.data.rates.USD) * 1000000) / 1000000,
        GBP: Math.round((response.data.rates.GBP / response.data.rates.USD) * 1000000) / 1000000,
      },
    };
    yield put({ type: EXCHANGE_RATE_FETCH_SUCCESS, payload: rates });
  } catch (e) {
    const payload =
      e.response && e.response.data && e.response.data.message
        ? e.response.data.message
        : e.message || 'Failed to fetch rates';
    yield put({ type: EXCHANGE_RATE_FETCH_FAIL, payload });
  }
}

export function* exchangeSagas() {
  yield takeLatest(EXCHANGE_RATE_FETCH_INIT, getExchangeRate);
}
