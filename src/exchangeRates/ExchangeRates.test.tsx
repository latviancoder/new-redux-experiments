import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import ExchangeRates from './ExchangeRates';
import store from '../store';

function renderWithRedux(ui: JSX.Element) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>)
  }
}

const fakeResponse = { 'rates': { 'CAD': 1.4602, 'HKD': 8.6367 }, 'base': 'EUR', 'date': '2019-08-01' };

test('shows loader when fetch button is pressed', () => {
  const { getByText, queryByRole } = renderWithRedux(
    <ExchangeRates/>,
  );

  expect(queryByRole('alert')).toBeNull();

  fireEvent.click(getByText(/fetch/i));

  expect(queryByRole('alert')).toBeInTheDocument();
});

test('shows exchange rates when fetch button is pressed', async () => {
  const { getByText, findByRole, queryAllByRole } = renderWithRedux(
    <ExchangeRates/>,
  );

  // @ts-ignore
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    });
  });

  fireEvent.click(getByText(/fetch/i));

  expect(await findByRole('list')).toBeInTheDocument();
  expect(queryAllByRole('listitem')).toHaveLength(2);
});

test('hides loader when exchange rates are fetched', async () => {
  const { getByText, findByRole, queryByRole } = renderWithRedux(
    <ExchangeRates/>,
  );

  // @ts-ignore
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    });
  });

  fireEvent.click(getByText(/fetch/i));

  expect(await findByRole('list')).toBeInTheDocument();
  expect(queryByRole('alert')).toBeNull();
});

test('shows error modal when fetching error occurs', async () => {
  const { getByText, findByRole, queryByRole } = renderWithRedux(
    <ExchangeRates/>,
  );

  jest.spyOn(window, 'fetch').mockImplementationOnce(() => Promise.reject('error'));

  fireEvent.click(getByText(/fetch/i));

  expect(await findByRole('dialog')).toBeInTheDocument();
});