import { Resume } from '@/api/resumeService';
import { Link } from 'react-router-dom';

interface Props {
  resume: Resume;
}

const ResumeItem = ({ resume }: Props) => {
  return <Link to={`/resume/${resume.id}`}>{resume.title}</Link>;
};

export default ResumeItem;
