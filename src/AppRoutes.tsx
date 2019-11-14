import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import ExchangeContainer from './features/exchange/components/ExchangeContainer';

const AppRoutes = () => (
  <Switch>
    <Redirect exact path="/" to="/exchange" />

    <Route exact path="/exchange" component={ExchangeContainer} />
    <Route exact path="/404" component={() => <h1>Not found.</h1>} />

    <Redirect path="*" to="/404" />
  </Switch>
);

export default AppRoutes;
