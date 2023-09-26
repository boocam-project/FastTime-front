import { ChangeEventHandler, HTMLAttributes } from 'react';
import { formatClassName } from '../../utils/classNames';
import checkIcon from '../../assets/icons/check.svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Input = ({ register, 'aria-invalid': isInvalid, ...props }: InputProps) => {
  const hasValue = props.value && props.value.length > 0;
  const isValid = isInvalid === 'false' && hasValue;
  const inputClass = formatClassName(hasValue && !isValid && 'error');

  console.log(isInvalid, props.value);
  console.log(register.name);

  return (
    <div className="input-wrapper">
      <input
        className={inputClass}
        {...props}
        aria-invalid={isInvalid}
        {...register}
        autoComplete="off"
      />
      {isValid && <img src={checkIcon} alt="check icon" />}
    </div>
  );
};

export default Input;
