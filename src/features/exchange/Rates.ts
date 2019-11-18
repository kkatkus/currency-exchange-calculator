import Big from 'big.js';

export default interface Rates {
  [name: string]: {
    [name: string]: Big;
  };
}
