import React, { ReactElement, useEffect, useState } from 'react';
import './Search.scss';

interface Props {
  onSearchRequest: (ethereumAddress: string) => void;
}

/* Search component with network selection option */
export default function Search({ onSearchRequest }: Props): ReactElement {
  const [address, setAddress] = useState('');

  /* Note that "useCallback()" is not necessary on below functions, we are not passing those as props to components */
  const handleAddressChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(target.value);
  };

  useEffect(() => {
    onSearchRequest(address);
  }, [address, onSearchRequest]);

  return (
    <section className='searchContainer'>
      <input
        data-testid='search-input'
        value={address}
        id='search-input'
        onChange={handleAddressChange}
        autoComplete='off'
        type='text'
        placeholder='Enter Ethereum address'
        className='searchContainer input'
      />
    </section>
  );
}
