import React from 'react';
import styled from '@emotion/styled';

interface Props {
  balance: number;
  symbol: string;
  value: string;
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

const ExchangeWarningMessage = ({ balance, symbol, value, canBalanceExceed }: Props) => {
  if (!canBalanceExceed) {
    return null;
  }
  let Message;

  if (balance < parseFloat(value)) {
    Message = <span>exceeds balance</span>;
  }

  if (parseFloat(value) < 0.1) {
    Message = <Error>Minimum amount is {symbol}0.10</Error>;
  }

  if (Message) {
    return <Wrapper>{Message}</Wrapper>;
  }

  return null;
};

export default ExchangeWarningMessage;
