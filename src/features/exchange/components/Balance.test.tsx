import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';
import Balance from './Balance';

import Big from 'big.js';
import { PocketType } from '../PocketType';

describe('<Balance />', () => {
  it('should render correct balance text', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Balance
          balance={new Big(20)}
          pocketType={PocketType.From}
          pocket={{
            amount: new Big(20),
            input: '20',
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Balance: $20.00');
  });

  it('should render without error span in pocket = PocketType.From', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Balance
          balance={new Big(20)}
          pocketType={PocketType.From}
          pocket={{
            amount: new Big(20),
            input: '20',
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.find('span#balance-error')).toHaveLength(0);
  });

  it('should render without error span in PocketType.To', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Balance
          balance={new Big(20)}
          pocketType={PocketType.To}
          pocket={{
            amount: new Big(30),
            input: '30',
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.find('span#balance-error')).toHaveLength(0);
  });

  it('should render with error span', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Balance
          balance={new Big(20)}
          pocketType={PocketType.From}
          pocket={{
            amount: new Big(30),
            input: '30',
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.find('span#balance-error')).toHaveLength(1);
  });
});
