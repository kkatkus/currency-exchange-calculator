import React from 'react';
import { mount } from 'enzyme';
import Rate from './Rate';
import { ThemeProvider } from 'emotion-theming';

import * as themes from '../../../shared/styles';

import Big from 'big.js';

describe('<Rate />', () => {
  it('should render correctly currency rate', () => {
    const wrapper = mount(
      <ThemeProvider theme={themes['light']}>
        <Rate
          rates={{ USD: { GBP: new Big(1.111) } }}
          pockets={{
            from: {
              input: '1',
              amount: new Big(1),
              currency: 'USD',
              symbol: '$',
            },
            to: {
              input: '1',
              amount: new Big(1),
              currency: 'GBP',
              symbol: '£',
            },
          }}
        />
      </ThemeProvider>,
    );
    expect(wrapper.text()).toEqual('$1 = £1.1110');
  });
});
