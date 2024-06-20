import { useGetResumes } from '../queries/useResume';
import ResumeItem from './ResumeItem';
import styles from './Resume.module.scss';

const ResumeList = () => {
  const { data: resumes } = useGetResumes();

  if (resumes?.length === 0) {
    return <div>자기소개서가 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {resumes?.map((resume) => (
        <div key={resume.id} className={styles.card}>
          <ResumeItem resume={resume} />
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
