import React from 'react';
import styled from '@emotion/styled';
import { getExchangeFee } from '../helper';
import Rates from '../Rates';

import Big from 'big.js';
import Pocket from '../Pocket';
import { PocketType } from '../PocketType';

interface Props {
  rates: Rates;
  balance: Big;
  freeLimit: Big;
  pocketType: PocketType;
  pocket: Pocket;
}

const Wrapper = styled('div')`
  position: absolute;
  bottom: 16px;
  right: 0;
  font-size: 14px;
  color: ${(props: any) => props.theme.colors.input};
`;

const Error = styled('div')`
  color: ${(props: any) => props.theme.colors.error};
`;

const WarningMessage = ({ rates, freeLimit, balance, pocketType, pocket }: Props) => {
  let Message;

  if (pocket.input === '') {
    return null;
  }

  if (pocketType === PocketType.To) {
    const exchangeFee = getExchangeFee(rates, freeLimit, pocket);
    if (exchangeFee.gt(0)) {
      Message = (
        <span>
          Fee: {pocket.symbol}
          {exchangeFee.toFixed(2)}
        </span>
      );
    }
  } else {
    if (pocket.amount.gt(balance)) {
      Message = <span>exceeds balance</span>;
    }

    if (pocket.amount.lt(0.1)) {
      Message = <Error>Minimum amount is {pocket.symbol}0.10</Error>;
    }
  }

  if (Message) {
    return <Wrapper>{Message}</Wrapper>;
  }

  return null;
};

export default WarningMessage;
