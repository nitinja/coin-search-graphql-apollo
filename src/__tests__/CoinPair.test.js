import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import CoinPair from '../components/CoinPair/CoinPair';

describe('CoinPair component ', () => {
  test('should show text elements with values when provided with market prop', async () => {
    const market = {
      "marketSymbol": "BitMEX:BTC/USD",
      "ticker": {
        "lastPrice": "6673.51000000",
        "highPrice": "6864.50000000",
        "lowPrice": "6502.00000000",
        "percentChange": "1.42000000"
      }
    }
    render(
      <CoinPair market={market}/>
    );
    expect(screen.getByTestId('exchange-name')).toBeInTheDocument();
    expect(screen.getByTestId('exchange-name').textContent).toEqual('BitMEX');
    expect(screen.getByTestId('coin-pair').textContent).toEqual('BTC/USD');
    expect(screen.getByTestId('last-price-formatted').textContent).toEqual('$6,673.51');
  });
});
