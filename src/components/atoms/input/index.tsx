import { RegisterOptions, useFormContext } from 'react-hook-form';
import styles from './input.module.scss';
import { InputHTMLAttributes } from 'react';
import CheckIcon from '../../../assets/icons/check.svg';
import classNames from 'classnames/bind';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  registerOptions?: RegisterOptions;
}

const Input = ({ name, label, registerOptions, ...rest }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const cx = classNames.bind(styles);
  const watchValue = watch(name);
  const fieldError = errors[name];
  const isValid = Boolean(fieldError === undefined && watchValue);

  return (
    <>
      <label className={cx('label')} htmlFor={name}>
        {label}
      </label>
      <div className={cx('input-wrapper')}>
        <input
          className={cx('input', fieldError ? 'error' : 'success')}
          {...register(name, registerOptions)}
          id={name}
          {...rest}
        />
        {isValid && <img src={CheckIcon} alt="check icon" className={styles.icon} />}
      </div>
      {fieldError && <span className={styles.message}>{fieldError.message as string}</span>}
    </>
  );
};

export default Input;
