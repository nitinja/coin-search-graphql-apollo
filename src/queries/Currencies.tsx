import { gql } from '@apollo/client';

export const Currencies = gql`
  query($query: String = "%", $pageSize: Int = 25) {
    assets(
      filter: { assetType: { _eq: Coin }, assetName: { _like: $query } }
      sort: [{ marketCapRank: ASC }]
      page: { limit: $pageSize }
    ) {
      id
      assetName
      assetSymbol
      marketCap
      markets(filter: { quoteSymbol: { _in: ["usd", "usdt"] } }) {
        # marketSymbol
        ticker {
          lastPrice
        }
      }
    }
  }
`;
