import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import configureStore from 'redux-mock-store';

import Exchange from './Exchange';
import * as themes from '../../../shared/styles';
import { PocketType } from '../PocketType';

import Big from 'big.js';

const mockStore = configureStore([]);

describe('<Exchange />', () => {
  let store;

  const defaultProps = {
    loading: false,
    error: undefined,
    rates: { GBP: { EUR: new Big(1.123), USD: new Big(1.234) }, EUR: { USD: new Big(1.111) } },
    freeLimit: new Big(3000),
    balances: { EUR: new Big(100), USD: new Big(100) },
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
    handleExchange: () => {},
    handleValueChange: (i: PocketType) => (val: string) => {},
    handleCurrencyChange: (i: PocketType) => (val: string) => {},
    handleCurrencySwitch: () => {},
  };

  beforeEach(() => {
    store = mockStore({
      settings: {
        theme: 'light',
      },
    });
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...defaultProps} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show error message', () => {
    const props = {
      ...defaultProps,
      error: 'error message here',
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.find('div#exchange-error')).toHaveLength(1);
  });

  it('should have exchange button disabled', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...defaultProps} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.find('button').html()).toContain('disabled=""');
  });

  it('should have exchange button enabled', () => {
    const props = {
      ...defaultProps,
      pockets: {
        from: {
          currency: 'EUR',
          symbol: '€',
          amount: new Big(10),
          input: '10',
        },
        to: {
          currency: 'USD',
          symbol: '$',
          amount: new Big(10),
          input: '10',
        },
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.find('button').html()).not.toContain('disabled=""');
  });

  it('should have exchange button disabled because balance lower than exchange amount', () => {
    const props = {
      ...defaultProps,
      pockets: {
        from: {
          currency: 'EUR',
          symbol: '€',
          amount: new Big(101),
          input: '101',
        },
        to: {
          currency: 'USD',
          symbol: '$',
          amount: new Big(10),
          input: '10',
        },
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.find('button').html()).toContain('disabled=""');
  });

  it('should not call handleExchange, because button should be disabled', () => {
    const handleExchange = jest.fn();

    const props = {
      ...defaultProps,
      pockets: {
        from: {
          currency: 'EUR',
          symbol: '€',
          amount: new Big(101),
          input: '101',
        },
        to: {
          currency: 'USD',
          symbol: '$',
          amount: new Big(10),
          input: '10',
        },
      },
      handleExchange,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    wrapper.find('button#exchange-submit').simulate('click');
    expect(handleExchange).not.toBeCalled();
  });

  it('should call handleExchange', () => {
    const handleExchange = jest.fn();

    const props = {
      ...defaultProps,
      pockets: {
        from: {
          currency: 'EUR',
          symbol: '€',
          amount: new Big(10),
          input: '10',
        },
        to: {
          currency: 'USD',
          symbol: '$',
          amount: new Big(10),
          input: '10',
        },
      },
      handleExchange,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    wrapper.find('button#exchange-submit').simulate('click');
    expect(handleExchange).toBeCalled();
  });
});
