import { Fragment } from 'react';
import LoadingSkeleton from '../skeletons';
import styles from './skeleton.module.scss';

const CommentSkeletons = () => {
  const commentSkeletons = [1, 2, 3];

  return (
    <div className={styles.container}>
      {commentSkeletons.map((item) => (
        <Fragment key={item}>
          <div className={styles.info}>
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
          <div className={styles.content}>
            <LoadingSkeleton />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CommentSkeletons;
