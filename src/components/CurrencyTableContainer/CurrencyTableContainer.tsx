import { useQuery } from '@apollo/client';
import React, { ReactElement, useState } from 'react';
import { Currencies } from '../../queries/Currencies';
import CurrencyTable from '../CurrencyTable/CurrencyTable';
import Paginator, {pageSizes} from '../Paginator/Paginator';

interface Props {
  searchQuery: string;
}

function CurrencyTableContainer({ searchQuery }: Props): ReactElement {
  const [pageSize, setPageSize] = useState<number>(() => pageSizes[0]);
  const {
    loading: fetchCurrencyLoading,
    error: fetchCurrencyError,
    data: currencyData,
  } = useQuery(Currencies, {
    variables: {
      query: getQueryVariableFromSearchTerm(searchQuery),
      pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <>
      {fetchCurrencyError && (
        <div className='errorMessage'>
          Error occurred while fetching Currency.
        </div>
      )}
      <CurrencyTable
        currencies={currencyData?.assets}
        currenciesLoading={fetchCurrencyLoading}
        baseCurrency='USD'></CurrencyTable>
      <Paginator pageSize={pageSize} setPageSize={setPageSize} />
    </>
  );
}
/* Query variable to use in gql query. Will return % if empty string provided. */
const getQueryVariableFromSearchTerm = (queryTerm: string) => {
  return queryTerm ? `%${queryTerm}%` : '%';
};

export default CurrencyTableContainer;
