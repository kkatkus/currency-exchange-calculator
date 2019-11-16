import React from 'react';
import { mount } from 'enzyme';
import CurrencyRate from './CurrencyRate';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';

describe('<CurrencyRate />', () => {
  it('should render correctly currency rate', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <CurrencyRate rates={{ USD: { GBP: 1.111 } }} currency={['USD', 'GBP']} />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('$1 = £1.111');
  });
});
