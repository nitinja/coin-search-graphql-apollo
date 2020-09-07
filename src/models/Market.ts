export interface Market {
  id: string;
  marketSymbol: string;
  ticker: Ticker;
}

export interface Ticker {
  lastPrice: number;
  highPrice: number;
  lowPrice: number;
  percentChange: string;
}
