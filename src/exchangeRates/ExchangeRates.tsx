import React from 'react';
import { useDispatch } from 'react-redux';

import { closeErrorModal, requestRates } from './exchangeRates.actions';
import { useTypedSelector } from '../store';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Loader from '../shared/Loader';
import List from './components/List';

const ExchangeRates: React.FC = () => {
  const { list, isErrorModalVisible } = useTypedSelector(state => state.exchangeRates);
  const { error, isFetching, payload: rates } = list;

  const dispatch = useDispatch();

  return <>
    <Button
      onClick={() => dispatch(requestRates())}
    >
      Fetch latest rates
    </Button>

    {isFetching && <Loader/>}

    {rates && <List rates={rates}/>}

    {isErrorModalVisible && (
      <Modal
        onClose={() => dispatch(closeErrorModal())}
      >
        {error && error.message}
      </Modal>
    )}
  </>;
};

export default ExchangeRates;