import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from './App';
import { MemoryRouter } from 'react-router';

const mockStore = configureStore([]);

describe('<App />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      exchange: {
        loading: true,
        activeIndex: 0,
        rates: {},
        balances: {},
        currency: ['EUR', 'GBP'],
        value: ['', ''],
      },
      settings: {
        theme: 'light',
      },
    });
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
