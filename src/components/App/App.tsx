import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { createDebouncedFn } from '../../helpers/helpers';
import CoinPairsContainer from '../CoinPairsContainer/CoinPairsContainer';
import CurrencyTableContainer from '../CurrencyTableContainer/CurrencyTableContainer';
import Search from '../Search/Search';
import './App.scss';

export default function App() {

  const history = useHistory();
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  /* Debounced search function to reduce network calls */
  const onSearchRequest = useRef(
    createDebouncedFn((searchQuery: string): void => {
      console.log(searchQuery);
      setSearchQuery(searchQuery);
      history.push('/');
    }, 500)
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /* Theme effect */
  useEffect(() => {
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className='container'>
      <header className='header'>
        <div className='title-container'>
          <Link to={'/'} className='main-title'>
            <h2>Cryptocurrency Market</h2>
          </Link>
          <button className='button-link' onClick={toggleTheme}>
            Change Theme
          </button>
        </div>
        <div>
          <Search onSearchRequest={onSearchRequest.current} />
        </div>
      </header>
      <main className='main'>
        <Switch>
          <Route path='/currency/:currencySymbol'>
            <CoinPairsContainer />
          </Route>
          <Route path='/'>
            <CurrencyTableContainer searchQuery={searchQuery} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
