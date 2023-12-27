import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Skeleton.module.scss';

const ArticleSkeletons = () => {
  const skeletons = [1, 2, 3, 4];

  return skeletons.map((skeleton) => (
    <div key={skeleton} className={styles.article}>
      <div className={styles.left}>
        <div className={styles.info}>
          <Skeleton width="2rem" height="2rem" borderRadius="50%" />
          <div className={styles.name}>
            <Skeleton height="0.5rem" />
          </div>
        </div>
        <div className={styles.content}>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
      <div className={styles.image}>
        <Skeleton width="8rem" height="8rem" />
      </div>
    </div>
  ));
};

export default ArticleSkeletons;
