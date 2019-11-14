import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { getState, saveState } from './utils/state';
import RootState from './RootState';

import './index.css';

const initialState = {
  ...getState(),
};
const store = configureStore(initialState);

store.subscribe(() => {
  const state = store.getState() as RootState;
  saveState({
    exchange: {
      loading: true,
      activeIndex: 0,
      rates: state.exchange.rates,
      balances: state.exchange.balances,
      currency: ['EUR', 'GBP'],
      value: ['', ''],
    },
    settings: {
      theme: state.settings.theme,
    },
  });
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
