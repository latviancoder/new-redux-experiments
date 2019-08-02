import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import exchangeRatesReducer from './exchangeRates/exchangeRates.reducer';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  exchangeRates: exchangeRatesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(),
    sagaMiddleware,
    // logger
  ]
});

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

sagaMiddleware.run(rootSaga);

export default store;