import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from './App';
import { MemoryRouter } from 'react-router';
import { PocketType } from './features/exchange/PocketType';
import { ThemeProvider } from 'emotion-theming';
import * as themes from './shared/styles';

import Big from 'big.js';

const mockStore = configureStore([]);

describe('<App />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      exchange: {
        loading: true,
        rates: { GBP: { EUR: new Big(1.123), USD: new Big(1.234) }, EUR: { USD: new Big(1.111) } },
        balances: { EUR: new Big(10), USD: new Big(10) },
        activePocket: PocketType.From,
        pockets: {
          from: {
            currency: 'EUR',
            symbol: '€',
            amount: new Big(0),
            input: '',
          },
          to: {
            currency: 'USD',
            symbol: '$',
            amount: new Big(0),
            input: '',
          },
        },
      },
      settings: {
        theme: 'light',
      },
    });
  });

  it('matches snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <MemoryRouter initialEntries={[{ pathname: '/exchange', key: 'testKey' }]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
