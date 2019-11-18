import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';
import Rates from '../Rates';
import Pockets from '../Pockets';
import { PocketType } from '../PocketType';

interface Props {
  rates: Rates;
  pockets: Pockets;
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

const Rate = ({ rates, pockets }: Props) => {
  const fromRates = rates[pockets[PocketType.From].currency];

  if (!fromRates) {
    return null;
  }

  const rate = fromRates[pockets[PocketType.To].currency];
  if (!rate) {
    return null;
  }

  return (
    <Wrapper>
      {pockets[PocketType.From].symbol}1 = {pockets[PocketType.To].symbol}
      {rate.toFixed(4)}
    </Wrapper>
  );
};

export default Rate;
