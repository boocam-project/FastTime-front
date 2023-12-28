import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'text';
};

const cx = classNames.bind(styles);

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx({ button: true, secondary: variant === 'secondary' })}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
