import Button from '@/components/atoms/button/Button';
import { Link, useParams } from 'react-router-dom';
import { useGetApplications, useGetStudy } from '../queries/studyQuery';
import styles from './StudyInfos.module.scss';
import ModalProvider, { Modal, ModalTrigger } from '@/components/atoms/modal/Modal';

const StudyInfos = () => {
  const params = useParams();
  const { data } = useGetStudy(parseInt(params.id!));
  const { data: applications } = useGetApplications(parseInt(params.id!));

  const [year, month, day] = new Date()
    .toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
    .split('. ');
  const today = `${year}-${month.padStart(2, '0')}-${day.slice(0, 2)}`;

  if (!data) return null;

  const isRecruiting = data.recruitmentEnd > today && data.recruitmentStart <= today;

  return (
    <div className={styles.top}>
      <div className={styles.stateContainer}>
        <div className={styles.dot} data-state={isRecruiting ? 'open' : 'closed'} />
        <span className={styles.state}>{isRecruiting ? '모집중' : '모집완료'}</span>
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.icon}>아바타</div>
          <span className={styles.name}>{data.nickname}</span>
          {/* TODO: createdAt 필요? */}
          <span className={styles.date}>날짜</span>
        </div>
        <div>
          <Link to={`/study/edit/${data.id}`}>수정</Link>
          <button>삭제</button>
          <ModalProvider>
            <ModalTrigger>
              <Button>{applications?.length}명의 지원자 보기</Button>
            </ModalTrigger>
            <Modal>
              <div>지원자 목록</div>
              <ul>
                {applications?.map((application) => (
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
