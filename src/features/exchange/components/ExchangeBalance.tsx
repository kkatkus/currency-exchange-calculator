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
  left: 0;
  font-size: 14px;
  color: ${(props: any) => props.theme.colors.input};
`;

const Error = styled('div')`
  color: ${(props: any) => props.theme.colors.error};
`;

const ExchangeBalance = ({ balance, symbol, value, canBalanceExceed }: Props) => {
  const isBalanceNegative = balance < parseFloat(value);
  const message = `Balance: ${symbol}${balance.toFixed(2)}`;
  return <Wrapper>{canBalanceExceed && isBalanceNegative ? <Error>{message}</Error> : message}</Wrapper>;
};

export default ExchangeBalance;
