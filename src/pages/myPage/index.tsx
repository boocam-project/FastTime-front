import { userState } from '@/store/store';
import Myboard from '../myBoard';
import MyComenets from '../myComents';
import styles from './myPage.module.scss';
import { useRecoilValue } from 'recoil';
import { useRef } from 'react';
import Modal from '@/components/atoms/modal';
import useModal from '@/hooks/useModal';
import { instance } from '@/api/client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchWithDraw = async () => {
  const response = await instance.delete(`/api/v1/delete`);
  return response.data;
};

const Mypage = () => {
  const userData = useRecoilValue(userState);
  const mypageModalRef = useRef(null);
  const { modalOpen, setModalOpen } = useModal(mypageModalRef);
  const navigator = useNavigate();

  const mutation = useMutation({
    mutationFn: fetchWithDraw,
    onSuccess(data) {
      alert(data.message);
      navigator('/');
    },
  });

  const withDrawClickHandler = () => {
    mutation.mutate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.userArticle}>
        <h3>{userData.nickname} 안녕하세요</h3>
        <div className={modalOpen ? styles.modalBackground : styles.btnBox}>
          <button className={styles.settingBtn} ref={mypageModalRef}>
            설정
          </button>
          <span className={styles.withdraw} onClick={withDrawClickHandler}>
            회원탈퇴
          </span>
          {modalOpen && <Modal setModalOpen={setModalOpen} />}
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
