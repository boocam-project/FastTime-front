import LoadingSkeleton from '../../../components/skeletons';
import styles from './Skeleton.module.scss';

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
