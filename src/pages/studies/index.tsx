import { Link } from 'react-router-dom';
import { useGetStudies } from './queries/studyQuery';

const StudiesPage = () => {
  const { data, isLoading } = useGetStudies();

  if (isLoading) return <div>로딩중...</div>;

  if (data?.data.studies.length === 0) return <div>스터디가 없습니다.</div>;

  return (
    <div>
      {data?.data.studies.map((study) => (
        <div key={study.id}>
          <Link to={`/study/${study.id}`}>{study.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default StudiesPage;
