import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './input.module.scss';
import { ComponentProps } from 'react';
import classNames from 'classnames/bind';
import Button from '../button';
import { CiSearch } from 'react-icons/ci';
// import InputIcon from './InputIcon';

interface Props extends ComponentProps<'input'> {
  name: string;
  label: string;
  register?: UseFormRegisterReturn;
  errorMessage?: any;
  variant?: 'defaultInput' | 'searchInput';
  className?: string;
  // value: string;
  subButton?: string;
}

const Input = ({
  name,
  label,
  register,
  errorMessage,
  className,
  variant,
  // value,
  subButton,
  ...props
}: Props) => {
  const cx = classNames.bind(styles);
  // const isValid = Boolean(errorMessage === undefined && props.value);

  return (
    <div className={styles.group}>
      <label className={cx('label')} htmlFor={name}>
        {label}
      </label>

      <div className={cx('input-wrapper', { search: variant === 'searchInput' })}>
        {variant === 'searchInput' && <CiSearch />}
        <input
          className={cx('input', className?.split(' '), { error: errorMessage })}
          id={name}
          autoComplete="off"
          value={props.value}
          {...register}
          {...props}
        />
        {/* <div className={styles.icon}>
          <InputIcon type={variant} isValid={isValid} />
        </div> */}
        {subButton && (
          <Button type="button" className="subBtn-gray-200" show>
            {subButton}
          </Button>
        )}
      </div>

      {variant === 'defaultInput' && errorMessage && (
        <div>
          <img src="/wranIcon.png" alt="wranImg"></img>
          <span className={styles.message}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
