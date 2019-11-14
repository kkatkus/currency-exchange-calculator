import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

interface Props {
  rates: any;
  currencies: any;
  currency: [string, string];
}

const Wrapper = styled('div')`
  position: absolute;
  display: block;
  top: -12px;
  left: 50%;
  margin-left: -60px;
  width: 120px;
  line-height: 20px;
  text-align: center;
  height: 24px;
  font-size: 12px;
  color: ${(props: any) => props.theme.colors.secondary};
  border: 2px solid ${(props: any) => lighten(0.3, props.theme.colors.input)};
  background-color: ${(props: any) => lighten(0.8, props.theme.colors.background)};
  border-radius: 2em;
`;

const CurrencyRate = ({ rates, currencies, currency }: Props) => {
  const rate = rates[currency[0]] ? rates[currency[0]][currency[1]] : 'n/a';
  const fromSymbol = (currencies.find(f => f.value === currency[0]) || {}).symbol;
  const toSymbol = (currencies.find(f => f.value === currency[1]) || {}).symbol;

  return (
    <Wrapper>
      {fromSymbol}1 = {toSymbol}
      {rate}
    </Wrapper>
  );
};

export default CurrencyRate;
