import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import configureStore from 'redux-mock-store';

import ExchangeContainer from './ExchangeContainer';

import * as themes from '../../../shared/styles';

const mockStore = configureStore([]);

describe('<ExchangeContainer />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      settings: {
        theme: 'light',
      },
    });
  });

  it('should render correctly currency rate', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={themes['light']}>
          <ExchangeContainer />
        </ThemeProvider>
      </Provider>,
    );
    expect(wrapper.text()).toEqual('$1 = £1.111');
  });
});
