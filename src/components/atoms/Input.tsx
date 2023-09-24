import { ChangeEvent, HTMLAttributes } from 'react';
import { formatClassName } from '../../utils/classNames';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  const inputClass = formatClassName(className);

  return <input className={inputClass} {...props} />;
};

export default Input;
