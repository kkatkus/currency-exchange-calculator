import React from 'react';
import styled from '@emotion/styled';
import { lighten, transparentize } from 'polished';

import Loader from '../../../shared/components/Loader';
import Button from '../../../shared/components/Button';
import CenteredBox from '../../../shared/components/CenteredBox';
import ExchangeInputBlock from './ExchangeInputBlock';
import { canExchange } from '../helper';
import Logo from '../../../shared/components/Logo';
import CurrencyRate from './CurrencyRate';
import ExchangeRates from '../ExchangeRates';
import ExchangeBalances from '../ExchangeBalances';

interface Props {
  balances: ExchangeBalances;
  rates: ExchangeRates;
  freeLimit: number;
  currency: [string, string];
  value: [string, string];
  loading: boolean;
  error?: string;
  handleExchange: (e: any) => void;
  handleValueChange: (i: number) => (e: Event) => void;
  handleCurrencyChange: (i: number) => (e: Event) => void;
  handleCurrencySwitch: () => void;
}

const Wrapper = styled('div')`
  padding: 20px;
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
  margin-bottom: 2em;

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

const SwitchCurrencies = styled('div')`
  position: absolute;
  display: block;
  top: -12px;
  width: 24px;
  height: 24px;
  border: 2px solid ${(props: any) => lighten(0.3, props.theme.colors.input)};
  background-color: ${(props: any) => lighten(0.4, props.theme.colors.background)};
  border-radius: 50%;
  cursor: pointer;
`;

const DarkenBlock = styled('div')`
  position: relative;
  margin: -20px;
  padding: 20px;
  background-color: ${(props: any) => transparentize(0.9, props.theme.colors.input)};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const Exchange = ({
  loading,
  error,
  rates,
  freeLimit,
  balances,
  currency,
  value,
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
        {error && <Error>{error}</Error>}
        <form onSubmit={handleExchange} method="post">
          <ExchangeInputBlock
            rates={rates}
            freeLimit={freeLimit}
            balance={balances[currency[0]]}
            currency={currency[0]}
            value={value[0]}
            canBalanceExceed
            handleValueChange={handleValueChange(0)}
            handleCurrencyChange={handleCurrencyChange(0)}
          />
          <DarkenBlock>
            <SwitchCurrencies onClick={handleCurrencySwitch} />
            <CurrencyRate rates={rates} currency={currency} />
            <ExchangeInputBlock
              rates={rates}
              freeLimit={freeLimit}
              balance={balances[currency[1]]}
              currency={currency[1]}
              value={value[1]}
              handleValueChange={handleValueChange(1)}
              handleCurrencyChange={handleCurrencyChange(1)}
            />
            <Button
              disabled={!canExchange(balances, currency, value)}
              onClick={handleExchange}
              type="submit"
              style={{ width: '100%' }}
            >
              Exchange
            </Button>
          </DarkenBlock>
        </form>
      </Loader>
    </Wrapper>
  </CenteredBox>
);

export default Exchange;
