import React from 'react';
import { Provider } from 'react-redux';

import ExchangeRates from './exchangeRates/ExchangeRates';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ExchangeRates/>
    </Provider>
  );
};

export default App;
