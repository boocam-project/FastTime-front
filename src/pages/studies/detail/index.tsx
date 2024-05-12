import StudyComments from '../components/StudyComments';
import StudyContent from '../components/StudyContent';
import StudyInfos from '../components/StudyInfos';
import styles from './index.module.scss';

const StudyDetailPage = () => {
  return (
    <div className={styles.container}>
      <StudyInfos />
      <StudyContent />
      <StudyComments />
    </div>
  );
};

export default StudyDetailPage;
