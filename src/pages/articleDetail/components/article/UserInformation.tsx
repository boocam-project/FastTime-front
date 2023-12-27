import { useArticle } from '../../hooks/useArticle';
import styles from './UserInformation.module.scss';
import { formatTime } from '../../utils';

const UserInformation = () => {
  const { data: article } = useArticle();

  return (
    <div className={styles.info}>
      <span className={styles.name}>{article.isAnonymity ? '익명' : article.nickname}</span>
      <span className={styles.date}>{formatTime(article.createdAt)}</span>
    </div>
  );
};

export default UserInformation;
