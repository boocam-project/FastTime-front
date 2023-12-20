import styles from './Button.module.scss';
import { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'text';
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className={styles.button} type="button">
      {children}
    </button>
  );
};

export default Button;
