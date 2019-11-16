import ExchangeRates from './ExchangeRates';
import ExchangeBalances from './ExchangeBalances';

export default interface ExchangeState {
  loading: boolean;
  error?: string;
  activeIndex: number;
  freeLimit: number;
  balances: ExchangeBalances;
  rates?: ExchangeRates;
  currency: [string, string];
  value: [string, string];
}
