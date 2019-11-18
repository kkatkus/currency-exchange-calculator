import { fork, put, delay } from 'redux-saga/effects';

import axios from 'axios';

import { EXCHANGE_RATE_FETCH_SUCCESS, EXCHANGE_RATE_FETCH_FAIL } from '../../actions';
import Rates from './Rates';
import { mapRates } from './helper';

function* getRates() {
  while (true) {
    try {
      const response = yield axios.get(`https://api.Ratesapi.io/latest?base=EUR`);
      const rates: Rates = mapRates(response.data.rates);
      yield put({ type: EXCHANGE_RATE_FETCH_SUCCESS, payload: rates });
    } catch (e) {
      yield put({ type: EXCHANGE_RATE_FETCH_FAIL, payload: 'Failed to fetch exchange rates' });
    }

    yield delay(10 * 1000);
  }
}

export function* exchangeSagas() {
  yield fork(getRates);
}
