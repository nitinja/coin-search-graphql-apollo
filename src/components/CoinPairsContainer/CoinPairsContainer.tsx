import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Market } from '../../models/Market';
import { MarketsByBaseSymbol } from '../../queries/MarketsByBaseSymbol';
import CoinPairsList from '../CoinPairsList/CoinPairsList';
import Loader from '../Loader';

export default function CoinPairsContainer() {
  const { currencySymbol } = useParams();

  /* Fetch markets based on url param */
  const {
    loading: fetchMarketsLoading,
    error: fetchMarketsError,
    data: marketsData,
  } = useQuery(MarketsByBaseSymbol, {
    variables: {
      symbol: currencySymbol,
    },
    fetchPolicy: 'cache-and-network',
  });

  const validData = marketsData
    ? marketsData.markets.filter((market: Market) => market.ticker)
    : [];
  return (
    <div className='coin-pairs-list-outer-container'>
      {fetchMarketsError && (
        <div className='errorMessage'>
          Error occurred while fetching markets.
        </div>
      )}
      {fetchMarketsLoading && !marketsData ? (
        <Loader />
      ) : (
        <div>
          <CoinPairsList marketData={validData} />
        </div>
      )}
    </div>
  );
}
