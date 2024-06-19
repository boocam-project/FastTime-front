import { useParams } from 'react-router-dom';
import { useGetResume } from '../queries/useResume';
import styles from './ResumeDetail.module.scss';
import MDEditor from '@uiw/react-md-editor';
import TableOfContents from './TableOfContents';

const ResumeDetailPage = () => {
  const { id } = useParams();
  const { data: resume } = useGetResume(parseInt(id!));

  if (!resume) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{resume.title}</h1>
        <MDEditor.Markdown source={resume.content} />
      </div>
      <TableOfContents content={resume.content} />
    </div>
  );
};

export default ResumeDetailPage;
