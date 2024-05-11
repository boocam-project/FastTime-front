import { useGetResumes } from '../queries/useResume';
import ResumeItem from './ResumeItem';

const ResumeList = () => {
  const { data: resumes } = useGetResumes();

  if (resumes?.length === 0) {
    return <div>자기소개서가 없습니다.</div>;
  }

  return (
    <div>
      {resumes?.map((resume) => (
        <div key={resume.id}>
          <ResumeItem resume={resume} />
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
