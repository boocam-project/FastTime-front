import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Item.module.scss';

interface Props extends ComponentProps<'li'> {
  title: string;
  organization: string;
  imageUrl: string;
  dDay: number;
  itemId: number;
  type?: 'activities' | 'competitions';
}

const Item = ({ title, organization, imageUrl, dDay, itemId, type }: Props) => {
  const navigate = useNavigate();

  return (
    <li className={styles.list}>
      <button
        onClick={() => {
          if (!type) return;
          navigate(`/activity/${itemId}?t=${type}`);
        }}
      >
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
