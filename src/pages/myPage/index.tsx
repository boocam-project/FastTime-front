import { userState } from '@/store/store';
import Myboard from '../myBoard';
import MyComenets from '../myComents';
import styles from './myPage.module.scss';
import { useRecoilValue } from 'recoil';
import { useRef } from 'react';
import Modal from '@/components/atoms/modal';
import useModal from '@/hooks/useModal';

const Mypage = () => {
  const userData = useRecoilValue(userState);
  const mypageModalRef = useRef(null);
  const mypageModal = useModal(mypageModalRef);

  return (
    <div className={styles.container}>
      <div className={styles.userArticle}>
        <h3>{userData.nickname} 안녕하세요</h3>
        <div className={mypageModal ? styles.modalBackground : ''}>
          <button className={styles.settingBtn} ref={mypageModalRef}>
            설정
          </button>
          {mypageModal && <Modal />}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sideArticle}>
          <div className={styles.sideArticleTop}>
            <div>참여하고 있는 스터디</div>
            <div>참여하고 있는 프로젝트</div>
            <div>출석률</div>
          </div>
          <div className={styles.sideArticleMiddle}>
            <div>즐겨찾기</div>
            <div>오늘할일</div>
          </div>
          <div className={styles.sideArticleBottom}>
            <div>주간일정</div>
          </div>
        </div>
        <div className={styles.boardArticle}>
          <Myboard />
          <MyComenets />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
