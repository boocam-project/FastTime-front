import { userState } from '@/store/store';
import Myboard from '../myBoard';
import MyComenets from '../myComments';
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
      <div className={styles['user-article']}>
        <h3>{userData.nickname} 안녕하세요</h3>
        <div className={modalOpen ? styles['modal-background'] : styles['btn-box']}>
          <button className={styles['setting-btn']} ref={mypageModalRef}>
            설정
          </button>
          <span className={styles.withdraw} onClick={withDrawClickHandler}>
            회원탈퇴
          </span>
          {modalOpen && <Modal setModalOpen={setModalOpen} />}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles['side-article']}>
          <div className={styles['side-article-top']}>
            <div>참여하고 있는 스터디</div>
            <div>참여하고 있는 프로젝트</div>
            <div>출석률</div>
          </div>
          <div className={styles['side-article-middle']}>
            <div>즐겨찾기</div>
            <div>오늘할일</div>
          </div>
          <div className={styles['side-article-bottom']}>
            <div>주간일정</div>
          </div>
        </div>
        <div className={styles['board-article']}>
          <Myboard />
          <MyComenets />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
