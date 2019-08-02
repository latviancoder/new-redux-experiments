import { Rate } from './exchangeRates/exchangeRates.reducer';

type RatesResponse = {
  rates: {
    [key: string]: number;
  }
};

export async function fetchRates(): Promise<Array<Rate>> {
  // Simulate longer request

  const response: RatesResponse = await window
    .fetch('https://api.exchangeratesapi.io/latest')
    .then(response => response.json());

  return Object.entries(response.rates).map(r => ({
    label: r[0],
    rate: r[1]
  }));
}