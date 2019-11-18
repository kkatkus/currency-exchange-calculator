import { EXCHANGE_UPDATE } from '../../actions';

export const updateExchange = data => ({
  type: EXCHANGE_UPDATE,
  payload: data,
});
