import LoadingSkeleton from '../skeletons';
import styles from './skeletons.module.scss';

const ArticleSkeletons = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <LoadingSkeleton />
      </div>
      <div className={styles.content}>
        <LoadingSkeleton />
      </div>
      <div className={styles.info}>
        <LoadingSkeleton />
      </div>
    </div>
  );
};

export default ArticleSkeletons;
