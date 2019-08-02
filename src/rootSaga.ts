import { all } from 'redux-saga/effects';
import { watchGetExchangeRatesSaga } from './exchangeRates/exchangeRates.sagas';

export default function* rootSaga() {
  yield all([
    watchGetExchangeRatesSaga()
  ]);
}