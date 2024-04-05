import { ComponentProps } from 'react';
// import styles from './index.module.scss';

interface Props extends ComponentProps<'div'> {
  space?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Divider = ({ space = 22, size = 'md', color = '#ccc', ...props }: Props) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
    height: size === 'sm' ? '1px' : size === 'lg' ? '3px' : '2px',
  };

  return <div style={style} {...props} />;
};

export default Divider;
