import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/button/Button';
import styles from './ArticleMenus.module.scss';

const ArticleMenus = () => {
  return (
    <Button variant="primary">
      <Link className={styles.link} to={'/write'}>
        <BsPencilSquare size={20} />
        <span>글쓰기</span>
      </Link>
    </Button>
  );
};

export default ArticleMenus;
