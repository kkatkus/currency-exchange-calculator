import Rates from './Rates';
import Big from 'big.js';
import { PocketType } from './PocketType';
import Pockets from './Pockets';
import Balances from './Balances';

export default interface ExchangeState {
  loading: boolean;
  error?: string;
  freeLimit: Big;
  rates: Rates;
  balances: Balances;
  activePocket: PocketType;
  pockets: Pockets;
}
