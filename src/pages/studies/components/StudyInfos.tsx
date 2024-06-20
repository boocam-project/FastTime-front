import Button from '@/components/atoms/button/Button';
import { Link, useParams } from 'react-router-dom';
import { useDeleteStudy, useGetApplications, useGetStudy } from '../queries/studyQuery';
import styles from './StudyInfos.module.scss';
import ModalProvider, { Modal, ModalTrigger } from '@/components/atoms/modal/Modal';

const StudyInfos = () => {
  const params = useParams();
  const { data: study } = useGetStudy(parseInt(params.id!));
  const { mutate } = useDeleteStudy();
  const { data: applications } = useGetApplications(parseInt(params.id!));

  const [year, month, day] = new Date()
    .toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
    .split('. ');
  const today = `${year}-${month.padStart(2, '0')}-${day.slice(0, 2)}`;

  const handleDelete = (id: number) => {
    mutate(id);
  };

  if (!study) return null;

  const isRecruiting = study.recruitmentEnd > today && study.recruitmentStart <= today;

  return (
    <div className={styles.container}>
      <div className={styles.stateContainer}>
        <div className={styles.dot} data-state={isRecruiting ? 'open' : 'closed'} />
        <span className={styles.state}>{isRecruiting ? '모집중' : '모집완료'}</span>
      </div>
      <h2 className={styles.title}>{study.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.icon}>아바타</div>
          <span className={styles.name}>{study.nickname}</span>
          {/* TODO: createdAt 필요? */}
          <span className={styles.date}>날짜</span>
        </div>
        <div className={styles.utils}>
          <div className={styles.btns}>
            <Button variant="text">
              <Link to={`/study/edit/${study.id}`}>수정</Link>
            </Button>
            <ModalProvider>
              <ModalTrigger>
                <Button variant="text">삭제</Button>
              </ModalTrigger>
              <Modal>
                <div>정말 삭제하시겠습니까?</div>
                <Button onClick={() => handleDelete(study.id)}>확인</Button>
              </Modal>
            </ModalProvider>
          </div>
          <ModalProvider>
            <ModalTrigger>
              <Button>{applications?.studyApplications.length}명의 지원자 보기</Button>
            </ModalTrigger>
            <Modal>
              <div>지원자 목록</div>
              <ul>
                {applications?.studyApplications.map((application) => (
                  <li key={application.id}>
                    <span>{application.nickname}</span>
                    <span>{application.message}</span>
                  </li>
                ))}
              </ul>
            </Modal>
          </ModalProvider>
        </div>
      </div>
    </div>
  );
};

export default StudyInfos;
