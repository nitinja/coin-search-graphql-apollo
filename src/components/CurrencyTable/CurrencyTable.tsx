import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { getAverageLastMarketPrice } from '../../helpers/CryptoApiUtils';
import { getFormattedCurrency } from '../../helpers/FormatUtils';
import { CryptoCurrency } from '../../models/CryptoCurrency';
import Loader from '../Loader';
import './CurrencyTable.scss';

interface Props {
  currencies: CryptoCurrency[] | null;
  currenciesLoading: boolean;
  baseCurrency: string;
}

/* Shows table of recent currencies. */
export default function CurrencyTable({
  currencies,
  currenciesLoading,
  baseCurrency,
}: Props): ReactElement {
  let transformedCurrency: any[] = [] as any;
  if (currencies) {
    transformedCurrency = transformCurrenciesList(currencies);
  }
  return (
    <div className='tableContainer'>
      {currenciesLoading && !currencies ? (
        <Loader />
      ) : (
        <section className='tableStyle'>
          <table data-testid='currency-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Pair</th>
                <th>Market Cap</th>
                <th>Average Last Price</th>
              </tr>
            </thead>
            <tbody>
              {transformedCurrency.map((currency: CryptoCurrency) => (
                <tr key={currency.id} data-testid='currency-row'>
                  <td data-testid='currency-name' title={currency.assetName}>
                    <Link to={`/currency/${currency.assetSymbol}`}>
                      {currency.assetName}
                    </Link>
                  </td>
                  <td>
                    {currency.assetSymbol}/{baseCurrency}
                  </td>
                  <td>{currency.marketCap}</td>
                  <td>{currency.averageLastPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

/* transform currency object to suitable data object */
export function transformCurrenciesList(currencies: CryptoCurrency[]) {
  return currencies.map(currency => {
    let averageLastPrice;
    try {
      averageLastPrice = getFormattedCurrency(
        getAverageLastMarketPrice(currency)
      );
    } catch (error) {
      console.warn(
        `Currency ${currency.assetName} does not have any valid market.`
      );
      averageLastPrice = 'N/A';
    }

    // format market cap
    const marketCap = getFormattedCurrency(currency.marketCap);
    return { ...currency, averageLastPrice, marketCap };
  });
}
