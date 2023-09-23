import { ChangeEvent, HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({ placeholder, type, value, onChange, className }: InputProps) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
