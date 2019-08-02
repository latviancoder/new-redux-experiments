import * as React from 'react';
import { Rate } from '../exchangeRates.reducer';

type Props = {
  rates: Array<Rate>;
}

const List: React.FC<Props> = ({ rates }) => {
  return <ul role="list">
    {rates.map(({label, rate}) => (
      <li key={label} role="listitem">
        <strong>{label}</strong> - {rate}
      </li>
    ))}
  </ul>;
};

export default List;