import React from 'react';
import styled from '@emotion/styled';

import Button from '../../../shared/components/Button';
import CenteredBox from '../../../shared/components/CenteredBox';
import ExchangeInputBlock from './ExchangeInputBlock';
import { canExchange } from '../helper';
import Logo from '../../../shared/components/Logo';
import { lighten, transparentize } from 'polished';
import CurrencyRate from './CurrencyRate';

interface Props {
  balances: any;
  rates: any;
  currency: [string, string];
  value: [string, string];
  loading?: boolean;
  error?: string;
  handleExchange: (e: any) => void;
  handleValueChange: (i: number) => (e: Event) => void;
  handleCurrencyChange: (i: number) => (e: Event) => void;
  handleCurrencySwitch: () => void;
}

const Wrapper = styled('div')`
  padding: 20px;
  max-width: 400px;
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
  margin-bottom: 3em;

  span {
    letter-spacing: 1.2px;
    font-size: 24px;
    font-weight: 600;
    padding-left: 20px;
  }
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

const currencies = [
  { title: 'EUR', value: 'EUR', symbol: '€' },
  { title: 'GBP', value: 'GBP', symbol: '£' },
  { title: 'USD', value: 'USD', symbol: '$' },
];

const Exchange = ({
  rates,
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
      <Title>
        <Logo />
      </Title>

      <form onSubmit={handleExchange} method="post">
        <ExchangeInputBlock
          currencies={currencies}
          balance={balances[currency[0]]}
          currency={currency[0]}
          value={value[0]}
          canBalanceExceed
          handleValueChange={handleValueChange(0)}
          handleCurrencyChange={handleCurrencyChange(0)}
        />
        <DarkenBlock>
          <SwitchCurrencies onClick={handleCurrencySwitch} />
          <CurrencyRate rates={rates} currencies={currencies} currency={currency} />
          <ExchangeInputBlock
            currencies={currencies}
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
    </Wrapper>
  </CenteredBox>
);

export default Exchange;
