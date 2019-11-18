import React from 'react';
import styled from '@emotion/styled';

import Big from 'big.js';
import Pocket from '../Pocket';
import { PocketType } from '../PocketType';

interface Props {
  balance: Big;
  pocketType: PocketType;
  pocket: Pocket;
}

const Wrapper = styled('div')`
  position: absolute;
  bottom: 16px;
  left: 0;
  font-size: 14px;
  color: ${(props: any) => props.theme.colors.input};
`;

const Error = styled('span')`
  color: ${(props: any) => props.theme.colors.error};
`;

const Balance = ({ balance, pocketType, pocket }: Props) => {
  const val = new Big(pocket.amount);
  const isNegative = val.gt(balance);
  const message = `Balance: ${pocket.symbol}${(balance || 0).toFixed(2)}`;
  return (
    <Wrapper>
      {pocketType === PocketType.From && isNegative ? <Error id="balance-error">{message}</Error> : message}
    </Wrapper>
  );
};

export default Balance;
