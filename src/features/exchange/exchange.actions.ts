import { EXCHANGE_RATE_FETCH_INIT, EXCHANGE_UPDATE } from '../../actions';

export const getExchangeRate = () => ({
  type: EXCHANGE_RATE_FETCH_INIT,
});

export const updateExchange = data => ({
  type: EXCHANGE_UPDATE,
  payload: data,
});
