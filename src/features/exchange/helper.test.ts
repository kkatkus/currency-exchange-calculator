import Big from 'big.js';
import { PocketType } from './PocketType';

import {
  validateValueFormat,
  validateMinValue,
  validateBalance,
  deductBalances,
  canExchange,
  getExchangeFee,
  deductExchangeFee,
  getCurrencySymbol,
  addSign,
  removeSign,
  exchangeInPockets,
} from './helper';

describe('helper.ts', () => {
  it('validateValueFormat test', () => {
    expect(validateValueFormat('')).toBeTruthy();
    expect(validateValueFormat('0')).toBeTruthy();
    expect(validateValueFormat('.')).toBeTruthy();
    expect(validateValueFormat('0.')).toBeTruthy();
    expect(validateValueFormat('.0')).toBeTruthy();
    expect(validateValueFormat('.000')).toBeFalsy();
    expect(validateValueFormat('0x2.00')).toBeFalsy();
    expect(validateValueFormat('2.000')).toBeFalsy();
    expect(validateValueFormat('a.000')).toBeFalsy();
    expect(validateValueFormat('0.0a')).toBeFalsy();
    expect(validateValueFormat('120000000000000.00')).toBeFalsy();
    expect(validateValueFormat('12000000000000.00')).toBeTruthy();
  });

  it('validateMinValue test', () => {
    expect(
      validateMinValue({
        amount: new Big(1),
        input: '1',
        currency: 'USD',
        symbol: '$',
      }),
    ).toBeTruthy();

    expect(
      validateMinValue({
        amount: new Big(0.1),
        input: '0.1',
        currency: 'USD',
        symbol: '$',
      }),
    ).toBeTruthy();

    expect(
      validateMinValue({
        amount: new Big(0),
        input: '0',
        currency: 'USD',
        symbol: '$',
      }),
    ).toBeFalsy();

    expect(
      validateMinValue({
        amount: new Big(0.0999),
        input: '0.0999',
        currency: 'USD',
        symbol: '$',
      }),
    ).toBeFalsy();
  });

  it('validateBalance test', () => {
    const balances = { USD: new Big(10) };

    expect(
      validateBalance(balances, {
        from: {
          amount: new Big(0),
          input: '0',
          currency: 'USD',
          symbol: '$',
        },
        to: {
          amount: new Big(0),
          input: '0',
          currency: 'EUR',
          symbol: '€',
        },
      }),
    ).toBeTruthy();

    expect(
      validateBalance(balances, {
        from: {
          amount: new Big(10),
          input: '10',
          currency: 'USD',
          symbol: '$',
        },
        to: {
          amount: new Big(0),
          input: '0',
          currency: 'EUR',
          symbol: '€',
        },
      }),
    ).toBeTruthy();

    expect(
      validateBalance(balances, {
        from: {
          amount: new Big(10.01),
          input: '10.01',
          currency: 'USD',
          symbol: '$',
        },
        to: {
          amount: new Big(0),
          input: '0',
          currency: 'EUR',
          symbol: '€',
        },
      }),
    ).toBeFalsy();

    expect(
      validateBalance(balances, {
        from: {
          amount: new Big(11),
          input: '11',
          currency: 'USD',
          symbol: '$',
        },
        to: {
          amount: new Big(0),
          input: '0',
          currency: 'EUR',
          symbol: '€',
        },
      }),
    ).toBeFalsy();
  });

  it('deductBalances test', () => {
    expect(
      deductBalances(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(10),
            input: '10',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(11),
            input: '11',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toEqual({ EUR: new Big(90), USD: new Big(31) });

    expect(
      deductBalances(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(1000),
            input: '1000',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(1100),
            input: '1100',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toEqual({ EUR: new Big(100), USD: new Big(20) });
  });

  it('canExchange test', () => {
    expect(
      canExchange(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(0),
            input: '0',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(11),
            input: '11',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toBeFalsy();

    expect(
      canExchange(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(20),
            input: '20',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(0),
            input: '0',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toBeFalsy();

    expect(
      canExchange(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(200),
            input: '200',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(10),
            input: '10',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toBeFalsy();

    expect(
      canExchange(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(0.05),
            input: '0.05',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(10),
            input: '10',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toBeFalsy();

    expect(
      canExchange(
        { EUR: new Big(100), USD: new Big(20) },
        {
          from: {
            amount: new Big(0.1),
            input: '0.1',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(10),
            input: '10',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toBeTruthy();
  });

  it('getExchangeFee test', () => {
    expect(
      getExchangeFee({ GBP: { EUR: new Big(1.1717) } }, new Big(40), {
        amount: new Big(20),
        input: '20',
        currency: 'EUR',
        symbol: '€',
      }),
    ).toEqual(new Big(0));

    expect(
      getExchangeFee({ GBP: { EUR: new Big(1.1717) } }, new Big(40), {
        amount: new Big(40),
        input: '40',
        currency: 'EUR',
        symbol: '€',
      }),
    ).toEqual(new Big(0));

    //0.01336.. ceil
    expect(
      getExchangeFee({ GBP: { EUR: new Big(1.1717) } }, new Big(40), {
        amount: new Big(50),
        input: '50',
        currency: 'EUR',
        symbol: '€',
      }),
    ).toEqual(new Big(0.02));
  });

  it('getExchangeFee test', () => {
    expect(
      deductExchangeFee({ GBP: { EUR: new Big(1.1717) } }, new Big(40), {
        amount: new Big(50),
        input: '50',
        currency: 'EUR',
        symbol: '€',
      }),
    ).toEqual(new Big(39.98));

    expect(
      deductExchangeFee({ GBP: { EUR: new Big(1.1717) } }, new Big(40), {
        amount: new Big(50000),
        input: '50000',
        currency: 'EUR',
        symbol: '€',
      }),
    ).toEqual(new Big(0));
  });

  it('getCurrencySymbol test', () => {
    expect(getCurrencySymbol('')).toEqual('');
    expect(getCurrencySymbol('USD')).toEqual('$');
  });

  it('addSign test', () => {
    expect(addSign('0', PocketType.From)).toEqual('-0');
    expect(addSign('0', PocketType.To)).toEqual('+0');
    expect(addSign('', PocketType.To)).toEqual('');
  });

  it('removeSign test', () => {
    expect(removeSign('+0')).toEqual('0');
    expect(removeSign('-0')).toEqual('0');
  });

  it('exchangeInPockets test', () => {
    expect(
      exchangeInPockets(
        PocketType.From,
        { EUR: { USD: new Big(1.1699) }, USD: { EUR: new Big(0.94) } },
        {
          from: {
            amount: new Big(10),
            input: '10.00',
            currency: 'EUR',
            symbol: '€',
          },
          to: {
            amount: new Big(10.11),
            input: '10.11',
            currency: 'USD',
            symbol: '$',
          },
        },
      ),
    ).toEqual({
      from: {
        amount: new Big(10),
        input: '10.00',
        currency: 'EUR',
        symbol: '€',
      },
      to: {
        amount: new Big(11.69),
        input: '11.69',
        currency: 'USD',
        symbol: '$',
      },
    });
  });

  expect(
    exchangeInPockets(
      PocketType.To,
      { EUR: { USD: new Big(1.1699) }, USD: { EUR: new Big(0.9411) } },
      {
        from: {
          amount: new Big(10),
          input: '10.00',
          currency: 'EUR',
          symbol: '€',
        },
        to: {
          amount: new Big(10),
          input: '10',
          currency: 'USD',
          symbol: '$',
        },
      },
    ),
  ).toEqual({
    from: {
      amount: new Big(9.42),
      input: '9.42',
      currency: 'EUR',
      symbol: '€',
    },
    to: {
      amount: new Big(10),
      input: '10',
      currency: 'USD',
      symbol: '$',
    },
  });
});
