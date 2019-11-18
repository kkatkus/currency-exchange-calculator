import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import configureStore from 'redux-mock-store';

import ExchangeContainer from './ExchangeContainer';

import * as themes from '../../../shared/styles';
import { PocketType } from '../PocketType';

import Big from 'big.js';

const mockStore = configureStore([]);

describe('<ExchangeContainer />', () => {
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
          <ExchangeContainer />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
