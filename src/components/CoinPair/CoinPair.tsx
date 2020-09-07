import React, { ReactElement } from 'react';
import {
  getFormattedCurrency,
  getFormattedNumber,
} from '../../helpers/FormatUtils';
import { Market } from '../../models/Market';
import './CoinPair.scss';
interface Props {
  market: Market;
}

export default function CoinPair({ market }: Props): ReactElement {
  const { marketSymbol, ticker } = market;
  const { lastPrice, highPrice, lowPrice, percentChange } = ticker;
  const [marketName, baseSymbol, quoteSymbol] = marketSymbol.split(/[:/]/);
  const lastPriceFormatted = getFormattedCurrency(ticker.lastPrice);
  return (
    <div className='coin-pair-container'>
      <div data-testid='exchange-name' className='exchange-name-container'>
        {marketName}
      </div>
      <div className='main'>
        <div className='info-box'>
          <div data-testid='coin-pair' className='info-content title-value'>
            {baseSymbol}/{quoteSymbol}
          </div>
          <div className='info-description'>Pair</div>
        </div>
        <div className='info-box'>
          <div
            className='info-content title-value'
            data-testid='last-price-formatted'>
            {lastPriceFormatted}
          </div>
          <div className='info-description'>Price</div>
        </div>
      </div>
      <hr />
      <div className='info-container'>
        <div className='info-box'>
          <div className='info-content'>
            {getFormattedNumber(lastPrice, 2)} {quoteSymbol}
          </div>
          <div className='info-description'>Last Price</div>
        </div>
        <div className='info-box'>
          <div className='info-content'>{getPercent(percentChange)}</div>
          <div className='info-description'>24 h Change</div>
        </div>
        <div className='info-box'>
          <div className='info-content'>
            {getFormattedNumber(lowPrice, 2)} {quoteSymbol}
          </div>
          <div className='info-description'>24 h Low</div>
        </div>
        <div className='info-box'>
          <div className='info-content'>
            {getFormattedNumber(highPrice, 2)} {quoteSymbol}
          </div>
          <div className='info-description'>24 h High</div>
        </div>
      </div>
    </div>
  );
}

/* Get percent markup with colour class applied */
export function getPercent(percentString: string) {
  const formattedNumber = getFormattedNumber(Number(percentString), 2);
  const className = Number(percentString) > 0 ? 'up' : 'down';
  return <span className={className}>{formattedNumber}%</span>;
}
