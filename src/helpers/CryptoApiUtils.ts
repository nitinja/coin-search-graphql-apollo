import { CryptoCurrency } from '../models/CryptoCurrency';

export function getAverageLastMarketPrice({ markets }: CryptoCurrency): number {
  if (!markets) {
    throw new Error('No market Provided.');
  }
  //filter out markets with null 'ticker' values
  const validMarkets = markets.filter(market => market.ticker);

  const totalValidMarketPrice = validMarkets.reduce(
    (sum, currentMarket) => sum + Number(currentMarket.ticker.lastPrice ?? 0),
    0
  );
  if (!validMarkets.length || !totalValidMarketPrice) {
    throw new Error('No valid market Provided.');
  }
  const averageLastPrice =
    totalValidMarketPrice !== 0
      ? totalValidMarketPrice / validMarkets.length
      : 0;
  return averageLastPrice;
}
