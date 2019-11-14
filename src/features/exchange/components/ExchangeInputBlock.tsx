import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../shared/components/Select';
import Input from '../../../shared/components/Input';
import ExchangeBalance from './ExchangeBalance';
import ExchangeWarningMessage from './ExchangeWarningMessage';
import { addSign } from '../helper';

interface Props {
  currencies: any;
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
  currencies = [],
  balance,
  currency,
  value,
  canBalanceExceed,
  handleValueChange,
  handleCurrencyChange,
}: Props) => {
  const symbol = (currencies.find(f => f.value === currency) || {}).symbol;
  return (
    <Row>
      <Select
        style={{ width: 74, position: 'absolute' }}
        options={currencies}
        name="from"
        value={currency}
        onChange={handleCurrencyChange}
      />
      <Input
        style={{ paddingLeft: 84, textAlign: 'right' }}
        placeholder="0"
        name="amont"
        value={addSign(value, canBalanceExceed)}
        onChange={handleValueChange}
      />
      <ExchangeBalance balance={balance} symbol={symbol} value={value} canBalanceExceed={canBalanceExceed} />
      <ExchangeWarningMessage balance={balance} symbol={symbol} value={value} canBalanceExceed={canBalanceExceed} />
    </Row>
  );
};

export default ExchangeInputBlock;
