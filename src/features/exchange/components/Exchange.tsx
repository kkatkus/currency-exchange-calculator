import React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import Loader from '../../../shared/components/Loader';
import Button from '../../../shared/components/Button';
import CenteredBox from '../../../shared/components/CenteredBox';
import SwitchedButton from '../../../shared/components/SwitchButton';
import Logo from '../../../shared/components/Logo';
import { canExchange } from '../helper';

import Rates from '../Rates';
import Balances from '../Balances';
import { PocketType } from '../PocketType';
import Big from 'big.js';
import Pockets from '../Pockets';
import Pocket from './Pocket';
import Rate from './Rate';

interface Props {
  loading: boolean;
  error?: string;
  rates: Rates;
  freeLimit: Big;
  balances: Balances;
  pockets: Pockets;
  handleExchange: (e: any) => void;
  handleValueChange: (pt: PocketType) => (val: string) => void;
  handleCurrencyChange: (pt: PocketType) => (val: string) => void;
  handleCurrencySwitch: () => void;
}

const Wrapper = styled('div')`
  max-width: 420px;
  min-width: 220px;
  width: 400px;
  @media (max-width: 320px) {
    width: 96vw;
  }
  @media (min-width: 321px) and (max-width: 768px) {
    width: 90vw;
  }
`;

const Title = styled('h1')`
  width: 100%;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;

  span {
    letter-spacing: 1.2px;
    font-size: 24px;
    font-weight: 600;
    padding-left: 20px;
  }
`;

const Error = styled('div')`
  width: 100%;
  padding: 10px;
  margin-bottom: 1em;
  border-radius: 3px;
  background-color: ${(props: any) => props.theme.colors.error};
  color: ${(props: any) => props.theme.colors.onError};
`;

interface PanelProps {
  even?: boolean;
}
const Panel = styled('div')<PanelProps>`
  position: relative;
  display: block;
  padding: 20px;
  background-color: ${(props: any) => (props.even ? transparentize(0.95, props.theme.colors.input) : '')};
`;

const Exchange = ({
  loading,
  error,
  rates,
  freeLimit,
  balances,
  pockets,
  handleExchange,
  handleValueChange,
  handleCurrencyChange,
  handleCurrencySwitch,
}: Props) => (
  <CenteredBox>
    <Wrapper>
      <Loader loading={loading}>
        <Title>
          <Logo />
        </Title>
        {error && <Error id="exchange-error">{error}</Error>}
        <form onSubmit={handleExchange} method="post">
          <Panel>
            <Pocket
              rates={rates}
              freeLimit={freeLimit}
              balance={balances[pockets[PocketType.From].currency]}
              pocket={pockets[PocketType.From]}
              pocketType={PocketType.From}
              handleValueChange={handleValueChange(PocketType.From)}
              handleCurrencyChange={handleCurrencyChange(PocketType.From)}
            />
          </Panel>
          <Panel even>
            <SwitchedButton handleClick={handleCurrencySwitch} />
            <Rate rates={rates} pockets={pockets} />
            <Pocket
              rates={rates}
              freeLimit={freeLimit}
              balance={balances[pockets[PocketType.To].currency]}
              pocketType={PocketType.To}
              pocket={pockets[PocketType.To]}
              handleValueChange={handleValueChange(PocketType.To)}
              handleCurrencyChange={handleCurrencyChange(PocketType.To)}
            />
            <Button
              id="exchange-submit"
              disabled={!canExchange(balances, pockets)}
              onClick={handleExchange}
              type="submit"
              style={{ width: '100%' }}
            >
              Exchange
            </Button>
          </Panel>
        </form>
      </Loader>
    </Wrapper>
  </CenteredBox>
);

export default Exchange;
