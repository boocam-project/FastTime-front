import styles from './Item.module.scss';
import LoadingSkeleton from '@/components/skeletons';

const ActivitySkeleton = () => {
  return (
    <li className={styles.list}>
      <button>
        <div>
          <LoadingSkeleton />
        </div>
      </button>
    </li>
  );
};

export default ActivitySkeleton;
