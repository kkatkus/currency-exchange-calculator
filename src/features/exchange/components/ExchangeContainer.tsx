import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Exchange from './Exchange';
import RootState from '../../../RootState';
import { updateExchange, getExchangeRate } from '../exchange.actions';
import useInterval from '../../../shared/hooks/useInterval';
import { validateValueFormat, removeSign } from '../helper';
import Loader from '../../../shared/components/Loader';

const ExchangeContainer = () => {
  const [error = '', loading, activeIndex, balances = {}, rates = {}, currency, value] = useSelector(
    (state: RootState) => [
      state.exchange.error,
      state.exchange.loading,
      state.exchange.activeIndex,
      state.exchange.balances,
      state.exchange.rates,
      state.exchange.currency,
      state.exchange.value,
    ],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeRate());
  }, [dispatch]);

  useInterval(() => {
    dispatch(getExchangeRate());
  }, 10000);

  const syncValue = (i: number, currency: [string, string], value: [string, string]) => {
    if (!value[i]) {
      return;
    }

    const oi = i === 0 ? 1 : 0;
    const rate = rates[currency[i]][currency[oi]];
    const val = parseFloat(value[i]);

    value[oi] = (Math.round(rate * val * 100) / 100).toFixed(2);
    dispatch(updateExchange({ value, activeIndex: i }));
  };

  const handleValueChange = (i: number) => e => {
    const val = removeSign(e.target.value);

    if (val === '') {
      dispatch(updateExchange({ value: ['', ''] }));
      return;
    }

    let newValue = [...value] as [string, string];
    newValue[i] = val;

    if (val[0] === '.') {
      newValue = ['', ''];
      newValue[i] = `0${val}`;
    }

    if (!validateValueFormat(newValue[i])) {
      return;
    }

    syncValue(i, currency, newValue);
  };

  const handleCurrencyChange = (i: number) => e => {
    const oi = i === 0 ? 1 : 0;
    const newCurrency = [...currency] as [string, string];

    if (e.target.value === newCurrency[oi]) {
      newCurrency[oi] = newCurrency[i];
    }
    newCurrency[i] = e.target.value;
    dispatch(updateExchange({ currency: newCurrency }));

    syncValue(0, newCurrency, value);
  };

  const handleCurrencySwitch = () => {
    const newCurrency = [currency[1], currency[0]] as [string, string];
    const newValue = [value[1], value[0]] as [string, string];
    dispatch(updateExchange({ currency: newCurrency, value: newValue }));
    syncValue(activeIndex, newCurrency, newValue);
  };

  const handleExchange = (e: Event) => {
    e.preventDefault();
    const newBalances = { ...balances };
    newBalances[currency[0]] = newBalances[currency[0]] - parseFloat(value[0]);
    newBalances[currency[1]] = newBalances[currency[1]] + parseFloat(value[1]);
    dispatch(updateExchange({ balances: newBalances, value: ['', ''] }));
  };

  return (
    <Loader loading={loading}>
      <Exchange
        balances={balances}
        rates={rates}
        currency={currency}
        value={value}
        loading={loading}
        error={error}
        handleExchange={handleExchange}
        handleValueChange={handleValueChange}
        handleCurrencyChange={handleCurrencyChange}
        handleCurrencySwitch={handleCurrencySwitch}
      />
    </Loader>
  );
};

export default ExchangeContainer;
