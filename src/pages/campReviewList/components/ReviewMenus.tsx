import Button from '@/components/atoms/button/Button';
import { Link } from 'react-router-dom';
import styles from './ReviewMenus.module.scss';

import { ReactComponent as PenSquare } from '@/assets/icons/pen_square.svg';

const ReviewMenus = () => {
  return (
    <Button variant="primary">
      <Link className={styles.link} to={'/review/write'}>
        <PenSquare />
        <span>리뷰 작성하기</span>
      </Link>
    </Button>
  );
};

export default ReviewMenus;
