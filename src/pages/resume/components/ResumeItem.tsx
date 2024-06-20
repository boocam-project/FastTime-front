import { Resume } from '@/api/resumeService';
import { Link } from 'react-router-dom';
import styles from './Resume.module.scss';

interface Props {
  resume: Resume;
}

const ResumeItem = ({ resume }: Props) => {
  const { title, writer, id, viewCount, likeCount, createdAt } = resume;

  return (
    <Link to={`/resume/${id}`} className={styles.content}>
      <p className={styles.title}>{title}</p>
      <p className={styles.writer}>{writer}</p>
      <div className={styles.info}>
        <span className={styles.viewCount}>조회수 {viewCount}</span>
        <span className={styles.likeCount}>좋아요 {likeCount}</span>
        <span className={styles.createdAt}>{createdAt}</span>
      </div>
    </Link>
  );
};

export default ResumeItem;
