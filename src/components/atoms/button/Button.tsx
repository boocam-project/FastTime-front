import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: string;
  variant: 'primary' | 'secondary' | 'text';
};

const Button = ({ children }: ButtonProps) => {
  return <button type="button">{children}</button>;
};

export default Button;
