import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import settings from './features/settings/settings.reducer';
import exchange from './features/exchange/exchange.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    settings,
    exchange,
  });

export default rootReducer;
