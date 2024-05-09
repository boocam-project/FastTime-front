import { ReactNode } from 'react';
import styles from './StudyContent.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}

const StudySubContent = ({ title, children }: Props) => {
  return (
    <div>
      <p className={styles.subTitle}>{title}</p>
      <div className={styles.subContent}>{children}</div>
    </div>
  );
};

export default StudySubContent;
