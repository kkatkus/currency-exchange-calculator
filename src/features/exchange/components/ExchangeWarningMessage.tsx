import React from 'react';
import styled from '@emotion/styled';
import { getExchangeFee } from '../helper';
import ExchangeRates from '../ExchangeRates';

interface Props {
  rates: ExchangeRates;
  currency: string;
  balance: number;
  symbol: string;
  value: string;
  freeLimit: number;
  canBalanceExceed?: boolean;
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

const ExchangeWarningMessage = ({ rates, freeLimit, currency, balance, symbol, value, canBalanceExceed }: Props) => {
  let Message;

  if (!canBalanceExceed) {
    const exchangeFee = getExchangeFee(rates, currency, value, freeLimit);
    if (exchangeFee > 0) {
      Message = (
        <span>
          Fee: {symbol}
          {exchangeFee}
        </span>
      );
    }
  } else {
    if (balance < parseFloat(value)) {
      Message = <span>exceeds balance</span>;
    }

    if (parseFloat(value) < 0.1) {
      Message = <Error>Minimum amount is {symbol}0.10</Error>;
    }
  }

  if (Message) {
    return <Wrapper>{Message}</Wrapper>;
  }

  return null;
};

export default ExchangeWarningMessage;
