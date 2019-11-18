import Big from 'big.js';

export default interface Pocket {
  currency: string;
  symbol: string;
  input: string;
  amount: Big;
}
