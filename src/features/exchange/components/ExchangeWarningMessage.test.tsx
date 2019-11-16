import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';
import ExchangeWarningMessage from './ExchangeWarningMessage';

describe('<ExchangeWarningMessage />', () => {
  it('should render empty when !canBalanceExceed', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeWarningMessage
          rates={{ GBP: { USD: 1.111 } }}
          freeLimit={300}
          currency={'USD'}
          balance={20}
          symbol={'$'}
          value={'20'}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('');
  });

  it('should render fee message', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeWarningMessage
          rates={{ GBP: { USD: 1.111 } }}
          freeLimit={10}
          currency={'USD'}
          balance={20}
          symbol={'$'}
          value={'20'}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Fee: $0.04');
  });

  it('should render error message = exceeds balance', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeWarningMessage
          rates={{ GBP: { USD: 1.111 } }}
          freeLimit={300}
          currency={'USD'}
          balance={20}
          symbol={'$'}
          value={'40'}
          canBalanceExceed
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('exceeds balance');
  });

  it('should render error message = Minimum amount is $0.10', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeWarningMessage
          rates={{ GBP: { USD: 1.111 } }}
          freeLimit={300}
          currency={'USD'}
          balance={20}
          symbol={'$'}
          value={'0.03'}
          canBalanceExceed
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Minimum amount is $0.10');
  });
});
