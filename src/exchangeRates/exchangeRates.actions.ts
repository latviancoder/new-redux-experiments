import { createAction } from 'redux-starter-kit';
import { Rate } from './exchangeRates.reducer';

export const requestRates = createAction('exchangeRates/requestRates');
export const fetchRatesStart = createAction('exchangeRates/fetchRatesStart');
export const fetchRatesSuccess = createAction<Array<Rate>>('exchangeRates/fetchRatesSuccess');
export const fetchRatesError = createAction<Error>('exchangeRates/fetchRatesError');
export const closeErrorModal = createAction('exchangeRates/closeErrorModal');