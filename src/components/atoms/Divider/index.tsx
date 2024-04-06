import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
  space?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  type?: 'vertical' | 'horizontal';
}

const Divider = ({
  space = 22,
  size = 'md',
  color = '#ccc',
  type = 'horizontal',
  ...props
}: Props) => {
  const horizontalStyle = {
    marginTop: space,
    marginBottom: space,
    background: color,
    height: size === 'md' ? '2px' : size === 'lg' ? '3px' : '1px',
  };

  const verticalStyle = {
    marginLeft: space,
    marginRight: space,
    background: color,
    width: size === 'md' ? '2px' : size === 'lg' ? '3px' : '1px',
  };

  return <div style={type === 'vertical' ? verticalStyle : horizontalStyle} {...props} />;
};

export default Divider;
