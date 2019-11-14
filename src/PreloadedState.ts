export default interface PreloadedState {
  exchange: {
    loading: boolean;
    activeIndex: number;
    rates: any;
    balances: any;
    currency: [string, string];
    value: [string, string];
  };
  settings: {
    theme: string;
  };
}
