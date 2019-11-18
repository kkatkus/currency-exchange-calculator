import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Exchange from './Exchange';
import RootState from '../../../RootState';
import { updateExchange } from '../exchange.actions';
import {
  validateValueFormat,
  deductExchangeFee,
  deductBalances,
  exchangeInPockets,
  getCurrencySymbol,
} from '../helper';
import { PocketType } from '../PocketType';
import Pockets from '../Pockets';

import Big from 'big.js';

const ExchangeContainer = () => {
  const [error, loading, freeLimit, balances, rates, activePocket, pockets] = useSelector((state: RootState) => [
    state.exchange.error,
    state.exchange.loading,
    state.exchange.freeLimit,
    state.exchange.balances,
    state.exchange.rates,
    state.exchange.activePocket,
    state.exchange.pockets,
  ]);

  const dispatch = useDispatch();

  const syncValue = (pt: PocketType, pockets: Pockets) => {
    dispatch(updateExchange({ pockets: exchangeInPockets(pt, rates, pockets), activePocket: pt }));
  };

  const handleValueChange = (pt: PocketType) => (val: string) => {
    const newPockets = {
      [PocketType.From]: {
        ...pockets[PocketType.From],
        input: '',
        amount: new Big(0),
      },
      [PocketType.To]: {
        ...pockets[PocketType.To],
        input: '',
        amount: new Big(0),
      },
    };

    if (val === '') {
      dispatch(updateExchange({ pockets: newPockets }));
      return;
    }

    newPockets[pt].input = val[0] === '.' ? `0${val}` : val;

    if (!validateValueFormat(newPockets[pt].input)) {
      return;
    }

    syncValue(pt, newPockets);
  };

  const handleCurrencyChange = (pt: PocketType) => currency => {
    const opt = pt === PocketType.From ? PocketType.To : PocketType.From;
    const newPockets = { ...pockets };

    // switch currencies if same selected
    if (currency === newPockets[opt].currency) {
      newPockets[opt].currency = newPockets[pt].currency;
      newPockets[opt].symbol = newPockets[pt].symbol;
    }
    newPockets[pt].currency = currency;
    newPockets[pt].symbol = getCurrencySymbol(currency);
    syncValue(activePocket, newPockets);
  };

  const handleCurrencySwitch = () => {
    const newPockets = {
      [PocketType.From]: { ...pockets[PocketType.To] },
      [PocketType.To]: { ...pockets[PocketType.From] },
    };
    const opt = activePocket === PocketType.From ? PocketType.To : PocketType.From;
    syncValue(opt, newPockets);
  };

  const handleExchange = (e: Event) => {
    e.preventDefault();
    const newBalances = deductBalances(balances, pockets);
    const newFreeLimit = deductExchangeFee(rates, freeLimit, pockets[PocketType.From]);
    const newPockets = {
      [PocketType.From]: {
        ...pockets[PocketType.From],
        input: '',
        amount: new Big(0),
      },
      [PocketType.To]: {
        ...pockets[PocketType.To],
        input: '',
        amount: new Big(0),
      },
    };
    dispatch(updateExchange({ balances: newBalances, pockets: newPockets, freeLimit: newFreeLimit }));
  };

  return (
    <Exchange
      balances={balances}
      rates={rates}
      freeLimit={freeLimit}
      pockets={pockets}
      loading={loading}
      error={error}
      handleExchange={handleExchange}
      handleValueChange={handleValueChange}
      handleCurrencyChange={handleCurrencyChange}
      handleCurrencySwitch={handleCurrencySwitch}
    />
  );
};

export default ExchangeContainer;
