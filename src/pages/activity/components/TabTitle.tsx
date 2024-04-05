import { ComponentProps } from 'react';
import styles from './TabTitle.module.scss';

interface Props extends ComponentProps<'button'> {
  text: string;
  active?: boolean;
}

const TabTitle = ({ text, active = false, ...props }: Props) => {
  const className = `${styles.title} ${active ? styles.active : ''}`;

  return (
    <button className={className} {...props}>
      {text}
    </button>
  );
};

export default TabTitle;
