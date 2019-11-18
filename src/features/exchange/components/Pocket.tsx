import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../shared/components/Select';
import Input from '../../../shared/components/Input';
import { addSign, removeSign } from '../helper';
import { CURRENCIES } from '../../../constants';
import Rates from '../Rates';
import Big from 'big.js';
import Balance from './Balance';
import IPocket from '../Pocket';
import WarningMessage from './WarningMessage';
import { PocketType } from '../PocketType';

interface Props {
  rates: Rates;
  freeLimit: Big;
  balance: Big;
  pocketType: PocketType;
  pocket: IPocket;
  handleValueChange: (e: string) => void;
  handleCurrencyChange: (e: string) => void;
}

const Row = styled('div')`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 3em;
  clear: both;
`;

const Pocket = ({ rates, freeLimit, balance, pocketType, pocket, handleValueChange, handleCurrencyChange }: Props) => (
  <Row>
    <Select
      style={{ width: 74, position: 'absolute' }}
      options={CURRENCIES}
      name={`${pocketType}-select`}
      value={pocket.currency}
      onChange={e => handleCurrencyChange(e.target.value)}
    />
    <Input
      style={{ paddingLeft: 84, textAlign: 'right' }}
      placeholder="0"
      name={`${pocketType}-input`}
      value={addSign(pocket.input, pocketType)}
      onChange={e => handleValueChange(removeSign(e.target.value).replace(',', '.'))}
    />
    <Balance balance={balance} pocket={pocket} pocketType={pocketType} />
    <WarningMessage rates={rates} balance={balance} pocketType={pocketType} pocket={pocket} freeLimit={freeLimit} />
  </Row>
);

export default Pocket;
