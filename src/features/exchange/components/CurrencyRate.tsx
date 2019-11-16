import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';
import { getCurrencySymbol } from '../helper';
import ExchangeRates from '../ExchangeRates';

interface Props {
  rates: ExchangeRates;
  currency: [string, string];
}

const Wrapper = styled('div')`
  position: absolute;
  display: block;
  top: -14px;
  left: 50%;
  margin-left: -60px;
  width: 120px;
  height: 28px;

  line-height: 24px;
  text-align: center;
  font-size: 12px;
  color: ${(props: any) => props.theme.colors.secondary};
  border: 2px solid ${(props: any) => lighten(0.3, props.theme.colors.input)};
  border-radius: 2em;
  background-color: ${(props: any) => lighten(0.8, props.theme.colors.background)};
`;

const CurrencyRate = ({ rates, currency }: Props) => {
  const rate = rates[currency[0]] ? rates[currency[0]][currency[1]] : 'n/a';
  const fromSymbol = getCurrencySymbol(currency[0]);
  const toSymbol = getCurrencySymbol(currency[1]);

  return (
    <Wrapper>
      {fromSymbol}1 = {toSymbol}
      {rate}
    </Wrapper>
  );
};

export default CurrencyRate;
