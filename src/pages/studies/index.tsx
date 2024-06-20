import { Link } from 'react-router-dom';
import { useGetStudies } from './queries/studyQuery';
import styles from './index.module.scss';

const StudiesPage = () => {
  const { data, isLoading } = useGetStudies();

  if (isLoading) return <div>로딩중...</div>;

  if (data?.data.studies.length === 0) return <div>스터디가 없습니다.</div>;

  return (
    <div className={styles.container}>
      {data?.data.studies.map((study) => {
        const isFull = study.current === study.total;
        const isRecruiting = study.recruitmentEnd > new Date().toISOString();

        return (
          <Link to={`/study/${study.id}`} key={study.id} className={styles.card}>
            <div className={styles.top}>
              <p className={styles.title}>{study.title}</p>
              <p>{isRecruiting ? '모집중' : '모집완료'}</p>
            </div>
            <div>
              {study.skill.split(',').map((s) => (
                <span key={s} className={styles.skill}>
                  {s}
                </span>
              ))}
            </div>
            <p>{isFull ? '모집 완료' : `${study.current} / ${study.total}`}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default StudiesPage;
