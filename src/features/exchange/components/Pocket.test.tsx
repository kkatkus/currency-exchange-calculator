import React from 'react';
import { mount } from 'enzyme';

import Pocket from './Pocket';
import { PocketType } from '../PocketType';
import { ThemeProvider } from 'emotion-theming';
import * as themes from '../../../shared/styles';

import Big from 'big.js';

describe('<Pocket />', () => {
  const defaultProps = {
    rates: { GBP: { EUR: new Big(1.123), USD: new Big(1.234) }, EUR: { USD: new Big(1.111) } },
    freeLimit: new Big(3000),
    balance: new Big(100),
    pocketType: PocketType.From,
    pocket: {
      currency: 'EUR',
      symbol: '€',
      amount: new Big(0),
      input: '',
    },
    handleValueChange: (pt: PocketType) => (val: string) => {},
    handleCurrencyChange: (pt: PocketType) => (val: string) => {},
  };

  it('should have correct select & input values for PocketType.From', () => {
    const props = {
      ...defaultProps,
      pocket: {
        currency: 'EUR',
        symbol: '€',
        amount: new Big(101),
        input: '101',
      },
    };

    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Pocket {...props} />
      </ThemeProvider>,
    );

    expect(wrapper.find(`input[name="${props.pocketType}-input"]`).props().value).toEqual('-101');
    expect(wrapper.find(`select[name="${props.pocketType}-select"]`).props().value).toEqual('EUR');
  });

  it('should have correct select & input values for PocketType.To', () => {
    const props = {
      ...defaultProps,
      pocketType: PocketType.To,
      pocket: {
        currency: 'EUR',
        symbol: '€',
        amount: new Big(101),
        input: '101.00',
      },
    };

    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Pocket {...props} />
      </ThemeProvider>,
    );

    expect(wrapper.find(`input[name="${props.pocketType}-input"]`).props().value).toEqual('+101.00');
    expect(wrapper.find(`select[name="${props.pocketType}-select"]`).props().value).toEqual('EUR');
  });

  it('should return correct value from input on change', () => {
    const valueChangeMock = jest.fn();

    const props = {
      ...defaultProps,
      pocketType: PocketType.To,
      pocket: {
        currency: 'EUR',
        symbol: '€',
        amount: new Big(101),
        input: '101.00',
      },
      handleValueChange: valueChangeMock,
    };

    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Pocket {...props} />
      </ThemeProvider>,
    );

    wrapper.find(`input[name="${props.pocketType}-input"]`).simulate('change');
    expect(valueChangeMock).toBeCalledWith('101.00');
  });
});
