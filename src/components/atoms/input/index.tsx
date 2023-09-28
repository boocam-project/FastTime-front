import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './input.module.scss';
import { ComponentProps } from 'react';
import classNames from 'classnames/bind';
import { CiSearch } from 'react-icons/ci';
import InputIcon from './InputIcon';

interface Props extends ComponentProps<'input'> {
  name: string;
  label: string;
  register?: UseFormRegisterReturn;
  errorMessage?: any;
  type?: string;
  className?: string;
}

const Input = ({ name, label, register, errorMessage, className, type, ...props }: Props) => {
  const cx = classNames.bind(styles);
  const isValid = Boolean(errorMessage === undefined);

  return (
    <div className={styles.group}>
      <label className={cx('label')} htmlFor={name}>
        {label}
      </label>

      <div className={cx('input-wrapper', className, { search: type === 'searchInput' })}>
        {type === 'searchInput' && <CiSearch />}
        <input
          className={cx('input', className, { error: errorMessage })}
          id={name}
          autoComplete="off"
          {...register}
          {...props}
        />
        <div className={styles.icon}>
          <InputIcon type={type} isValid={isValid} />
        </div>
      </div>

      {type === 'defaultInput' && errorMessage && (
        <span className={styles.message}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
