import { takeEvery, put } from '@redux-saga/core/effects';
import { fetchRatesError, fetchRatesStart, fetchRatesSuccess, requestRates } from './exchangeRates.actions';
import { fetchRates } from '../api';

export function* fetchRatesWorker() {
  yield put(fetchRatesStart());

  try {
    const rates = yield fetchRates();
    yield put(fetchRatesSuccess(rates));
  } catch (e) {
    yield put(fetchRatesError(e));
  }
}

export function* watchGetExchangeRatesSaga() {
  yield takeEvery(requestRates, fetchRatesWorker);
}