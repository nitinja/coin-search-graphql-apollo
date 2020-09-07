import { Market } from './Market';

export interface CryptoCurrency {
  id: string;
  assetName: string;
  assetSymbol: string;
  marketCap: number;
  markets: Market[];
  averageLastPrice: number | string | null;
}
