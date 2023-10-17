import { HTMLAttributes, MouseEventHandler } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames/bind';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: string;
  show: boolean;
  full?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
}

const Button = ({ className, type, children, show, full, onClick }: ButtonProps) => {
  const cx = classNames.bind(styles);

  return (
    <button
      type={type}
      className={cx(className, { full: full })}
      disabled={!show}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
