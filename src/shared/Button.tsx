import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // some additional button props
};

const Button: React.FC<Props> = ({ children, type = 'button', ...rest }) => {
  return <button
    type={type}
    {...rest}
  >
    {children}
  </button>;
};

export default Button;