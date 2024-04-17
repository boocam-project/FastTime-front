import { ComponentProps } from 'react';
import styles from './StatusBadge.module.scss';

interface Props extends ComponentProps<'button'> {
  text: string;
  active?: boolean;
}

const StatusBadge = ({ text, active = false, ...props }: Props) => {
  const className = `${styles.status} ${active ? styles.active : ''}`;

  return (
    <button className={className} {...props}>
      <span className={active ? styles.active : ''} />
      <span>{text}</span>
    </button>
  );
};

export default StatusBadge;
