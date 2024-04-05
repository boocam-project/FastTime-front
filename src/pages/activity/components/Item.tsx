import { ComponentProps } from 'react';
import styles from './Item.module.scss';

interface Props extends ComponentProps<'li'> {
  title: string;
  organization: string;
  imageUrl: string;
  dDay: number;
}

const Item = ({ title, organization, imageUrl, dDay }: Props) => {
  return (
    <li className={styles.list}>
      <button>
        <div>
          <img src={imageUrl} alt={title} />
        </div>
        <div>{title}</div>
        <div>
          <span>{organization}</span>
          <span>D-{dDay}</span>
        </div>
      </button>
    </li>
  );
};

export default Item;
