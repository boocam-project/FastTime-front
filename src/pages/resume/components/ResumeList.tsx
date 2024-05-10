import { useGetResumes } from '../queries/useResume';
import Resume from './Resume';

const ResumeList = () => {
  const { data: resumes } = useGetResumes();

  return (
    <div>
      {resumes?.map((resume) => (
        <div key={resume.id}>
          <Resume />
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
