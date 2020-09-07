import * as React from 'react';
import { Market } from '../../models/Market';
import CoinPair from '../CoinPair/CoinPair';
import './CoinPairsList.scss';

interface Props {
  marketData: Market[];
}

export default function CoinPairsList({ marketData }: Props) {
  return (
    <div className='coin-pairs-list-container'>
      {marketData.map(market => (
        <CoinPair key={market.id} market={market} />
      ))}
    </div>
  );
}
