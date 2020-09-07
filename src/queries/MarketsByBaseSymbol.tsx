import { gql } from '@apollo/client';
export const MarketsByBaseSymbol = gql`
  query($symbol: String) {
    markets(
      filter: {
        baseSymbol: { _eq: $symbol }
        quoteSymbol: { _in: ["usd", "usdt"] }
      }
    ) {
      id
      marketSymbol
      ticker {
        lastPrice
        highPrice
        lowPrice
        percentChange
      }
    }
  }
`;
