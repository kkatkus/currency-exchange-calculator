import { put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';

import { EXCHANGE_RATE_FETCH_INIT, EXCHANGE_RATE_FETCH_SUCCESS, EXCHANGE_RATE_FETCH_FAIL } from '../../actions';
import { EXCHANGE_RATE_API_ID } from '../../constants';

function* getExchangeRate({ type, payload }) {
  try {
    const response = yield axios.get(`https://openexchangerates.org/api/latest.json?app_id=${EXCHANGE_RATE_API_ID}`);

    const rates = {
      EUR: {
        GBP: Math.round((response.data.rates.GBP / response.data.rates.EUR) * 1000000) / 1000000,
        USD: Math.round((1 / response.data.rates.EUR) * 1000000) / 1000000,
      },
      GBP: {
        EUR: Math.round((response.data.rates.EUR / response.data.rates.GBP) * 1000000) / 1000000,
        USD: Math.round((1 / response.data.rates.GBP) * 1000000) / 1000000,
      },
      USD: {
        EUR: response.data.rates.EUR,
        GBP: response.data.rates.GBP,
      },
    };
    yield put({ type: EXCHANGE_RATE_FETCH_SUCCESS, payload: rates });
  } catch (e) {
    const payload =
      e.response && e.response.data && e.response.data.message
        ? e.response.data.message
        : e.message || 'Failed to login';
    yield put({ type: EXCHANGE_RATE_FETCH_FAIL, payload });
  }
}

export function* exchangeSagas() {
  yield takeLatest(EXCHANGE_RATE_FETCH_INIT, getExchangeRate);
}
