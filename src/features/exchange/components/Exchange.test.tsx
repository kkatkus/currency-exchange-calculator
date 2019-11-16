import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import configureStore from 'redux-mock-store';

import Exchange from './Exchange';
import * as themes from '../../../shared/styles';

const mockStore = configureStore([]);

describe('<Exchange />', () => {
  let store;

  const defaultProps = {
    loading: false,
    error: undefined,
    rates: { GBP: { EUR: 1.222, USD: 1.333 }, EUR: { USD: 1.111 } },
    freeLimit: 3000,
    balances: { EUR: 100, USD: 100 },
    currency: ['EUR', 'USD'] as [string, string],
    value: ['', ''] as [string, string],
    handleExchange: () => {},
    handleValueChange: i => e => {},
    handleCurrencyChange: i => e => {},
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
    expect(wrapper.text()).toContain(props.error);
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
      value: ['10', '10'] as [string, string],
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
      value: ['101', '10'] as [string, string],
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
      value: ['101', '10'] as [string, string],
      handleExchange,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');
    expect(handleExchange).not.toBeCalled();
  });

  it('should call handleExchange', () => {
    const handleExchange = jest.fn();

    const props = {
      ...defaultProps,
      value: ['10', '10'] as [string, string],
      handleExchange,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <Exchange {...props} />
        </ThemeProvider>
      </Provider>,
    );
    wrapper.find('button').simulate('click');
    expect(handleExchange).toBeCalled();
  });
});
