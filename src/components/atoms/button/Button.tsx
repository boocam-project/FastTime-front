import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text' | 'default';
  classNames?: string;
};

const cx = classNames.bind(styles);

const Button = ({ children, classNames, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(classNames, {
        button: true,
        secondary: variant === 'secondary',
        text: variant === 'text',
        default: variant === 'default',
      })}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
