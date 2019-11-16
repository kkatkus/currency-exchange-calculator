import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';
import ExchangeBalance from './ExchangeBalance';

describe('<CurrencyRate />', () => {
  it('should render correctly balance text', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeBalance balance={20} symbol={'$'} value={'20'} canBalanceExceed />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('Balance: $20.00');
  });

  it('should render without error span', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeBalance balance={20} symbol={'$'} value={'20'} canBalanceExceed />
      </ThemeProvider>,
    );
    expect(wrapper.find('span')).toHaveLength(0);
  });

  it('should render with error span', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeBalance balance={20} symbol={'$'} value={'30'} canBalanceExceed />
      </ThemeProvider>,
    );
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('should render without error span', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <ExchangeBalance balance={20} symbol={'$'} value={'30'} />
      </ThemeProvider>,
    );
    expect(wrapper.find('span')).toHaveLength(0);
  });
});
