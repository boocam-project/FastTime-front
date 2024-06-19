import { Link } from 'react-router-dom';
import Button from '@/components/atoms/button/Button';
import styles from './ArticleMenus.module.scss';

import { ReactComponent as PenSquare } from '@/assets/icons/pen_square.svg';

const ArticleMenus = () => {
  return (
    <Button variant="primary">
      <Link className={styles.link} to={'/write'}>
        <PenSquare />
        <span>글쓰기</span>
      </Link>
    </Button>
  );
};

export default ArticleMenus;
