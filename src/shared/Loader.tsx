import React from 'react';

type Props = {
  label?: string;
}

const Loader: React.FC<Props> = ({ label = 'Loading...' }) => {
  return <div role="alert">{label}</div>;
};

export default Loader;