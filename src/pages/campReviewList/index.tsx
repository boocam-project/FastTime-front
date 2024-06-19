import styles from './index.module.scss';
import ReviewDescriptions from './components/ReviewDescriptions';
import ReviewMenus from './components/ReviewMenus';
import BootcampList from './components/BootcampList';

const CampReviewListPage = () => {
  return (
    <div className={styles.container}>
      <ReviewDescriptions />
      <ReviewMenus />
      <BootcampList />
    </div>
  );
};

export default CampReviewListPage;
