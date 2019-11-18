import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';
import WarningMessage from './WarningMessage';

import Big from 'big.js';
import { PocketType } from '../PocketType';

describe('<WarningMessage />', () => {
  it('should render empty when PocketType.From', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <WarningMessage
          rates={{ GBP: { USD: new Big(1.111) } }}
          balance={new Big(400)}
          freeLimit={new Big(300)}
          pocketType={PocketType.From}
          pocket={{
            input: '20',
            amount: new Big(20),
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('');
  });

  it('should render fee message', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <WarningMessage
          rates={{ GBP: { USD: new Big(1.111) } }}
          balance={new Big(400)}
          freeLimit={new Big(10)}
          pocketType={PocketType.To}
          pocket={{
            input: '20',
            amount: new Big(20),
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Fee: $0.05');
  });

  it('should render error message = exceeds balance', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <WarningMessage
          rates={{ GBP: { USD: new Big(1.111) } }}
          balance={new Big(10)}
          freeLimit={new Big(300)}
          pocketType={PocketType.From}
          pocket={{
            input: '20',
            amount: new Big(20),
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('exceeds balance');
  });

  it('should render error message = Minimum amount is $0.10', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <WarningMessage
          rates={{ GBP: { USD: new Big(1.111) } }}
          balance={new Big(400)}
          freeLimit={new Big(300)}
          pocketType={PocketType.From}
          pocket={{
            input: '0.03',
            amount: new Big(0.03),
            currency: 'USD',
            symbol: '$',
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Minimum amount is $0.10');
  });
});
