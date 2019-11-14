import {
  EXCHANGE_RATE_FETCH_INIT,
  EXCHANGE_RATE_FETCH_SUCCESS,
  EXCHANGE_RATE_FETCH_FAIL,
  EXCHANGE_UPDATE,
} from '../../actions';

const exchangeReducer = (state = {}, action) => {
  switch (action.type) {
    case EXCHANGE_UPDATE:
      return { ...state, ...action.payload };
    case EXCHANGE_RATE_FETCH_INIT:
      return { ...state, loading: true, error: null };
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
