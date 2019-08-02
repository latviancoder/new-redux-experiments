import { createReducer, PayloadAction } from 'redux-starter-kit';
import { closeErrorModal, fetchRatesError, fetchRatesStart, fetchRatesSuccess } from './exchangeRates.actions';

export type Rate = {
  label: string;
  rate: number;
};

type State = {
  list: {
    isFetching: boolean;
    error: Error | null;
    payload: Array<Rate>;
  },
  isErrorModalVisible: boolean;
}

const initialState: State = {
  list: {
    isFetching: false,
    error: null,
    payload: []
  },
  isErrorModalVisible: false
};

const exchangeRatesReducer = createReducer(
  initialState,
  {
    [fetchRatesStart.type]: state => {
      state.list.isFetching = true;
      state.list.error = null;
    },
    [fetchRatesSuccess.type]: (state, { payload }: PayloadAction<Array<Rate>>) => {
      state.list = {
        payload,
        isFetching: false,
        error: null
      }
    },
    [fetchRatesError.type]: (state, { payload }: PayloadAction<Error>) => {
      state.list.isFetching = false;
      state.list.error = payload;
      state.isErrorModalVisible = true;
    },
    [closeErrorModal.type]: (state) => {
      state.isErrorModalVisible = false;
    }
  }
);

export default exchangeRatesReducer;