import styles from './index.module.scss';
import { ComponentProps, ReactNode } from 'react';
import classNames from 'classnames/bind';

type FlexProps = ComponentProps<'div'> & {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: number | string;
};

const cx = classNames.bind(styles);

const FlexBox = ({ children, direction = 'row', gap, ...props }: FlexProps) => {
  const flexStyle = {
    '--gap': gap,
    ...props.style,
  };

  return (
    <div
      {...props}
      style={flexStyle}
      className={cx({
        flex: true,
        column: direction === 'column',
      })}
    >
      {children}
    </div>
  );
};

export default FlexBox;
