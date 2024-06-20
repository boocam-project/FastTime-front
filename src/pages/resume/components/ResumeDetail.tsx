import { useParams } from 'react-router-dom';
import { useGetResume } from '../queries/useResume';
import styles from './ResumeDetail.module.scss';
import MDEditor from '@uiw/react-md-editor';
import TableOfContents from './TableOfContents';
import Button from '@/components/atoms/button/Button';
import ModalProvider, { Modal, ModalTrigger } from '@/components/atoms/modal/Modal';
import { usePropose } from '@/pages/studies/queries/studyQuery';
import { useState } from 'react';

const ResumeDetailPage = () => {
  const { id } = useParams();
  const { data: resume } = useGetResume(parseInt(id!));
  const propose = usePropose();
  const [message, setMessage] = useState('');

  const handlePropose = () => {
    propose.mutate({ studyId: parseInt(id!), memberId: 1, message: 'ㅇ' });
  };

  if (!resume) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div>
            <p>{resume.writer}</p>
            <h1 className={styles.title}>{resume.title}</h1>
          </div>
          <ModalProvider>
            <ModalTrigger>
              <Button>스터디 제안하기</Button>
            </ModalTrigger>
            <Modal>
              <div className={styles.propose}>
                <p>{resume.writer}님께 스터디를 제안하시겠습니까?</p>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="제안 요청 메시지를 입력하세요."
                />
                <Button onClick={handlePropose}>제안하기</Button>
              </div>
            </Modal>
          </ModalProvider>
        </div>
        <MDEditor.Markdown source={resume.content} />
      </div>
      <TableOfContents content={resume.content} />
    </div>
  );
};

export default ResumeDetailPage;
