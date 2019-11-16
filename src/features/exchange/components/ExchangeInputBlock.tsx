import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../shared/components/Select';
import Input from '../../../shared/components/Input';
import ExchangeBalance from './ExchangeBalance';
import ExchangeWarningMessage from './ExchangeWarningMessage';
import { addSign, getCurrencySymbol } from '../helper';
import { CURRENCIES } from '../../../constants';
import ExchangeRates from '../ExchangeRates';

interface Props {
  rates: ExchangeRates;
  freeLimit: number;
  balance: number;
  currency: string;
  value: string;
  canBalanceExceed?: boolean;
  handleValueChange: (e: any) => void;
  handleCurrencyChange: (e: any) => void;
}

const Row = styled('div')`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 3em;
  clear: both;
`;

const ExchangeInputBlock = ({
  rates,
  freeLimit,
  balance,
  currency,
  value,
  canBalanceExceed,
  handleValueChange,
  handleCurrencyChange,
}: Props) => {
  const symbol = getCurrencySymbol(currency);
  return (
    <Row>
      <Select
        style={{ width: 74, position: 'absolute' }}
        options={CURRENCIES}
        name="from"
        value={currency}
        onChange={handleCurrencyChange}
      />
      <Input
        style={{ paddingLeft: 84, textAlign: 'right' }}
        placeholder="0"
        name="amount"
        value={addSign(value, canBalanceExceed)}
        onChange={handleValueChange}
      />
      <ExchangeBalance balance={balance} symbol={symbol} value={value} canBalanceExceed={canBalanceExceed} />
      <ExchangeWarningMessage
        rates={rates}
        currency={currency}
        balance={balance}
        symbol={symbol}
        value={value}
        freeLimit={freeLimit}
        canBalanceExceed={canBalanceExceed}
      />
    </Row>
  );
};

export default ExchangeInputBlock;
