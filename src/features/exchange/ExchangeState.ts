export default interface ExchangeState {
  loading: boolean;
  error?: string;
  activeIndex: number;
  balances: any;
  rates?: {
    [name: string]: {
      [name: string]: number;
    };
  };
  currency: [string, string];
  value: [string, string];
}
