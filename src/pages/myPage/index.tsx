import { useState } from 'react';
import SettingsModal from './SettingsModal';
import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';

const MyPage = () => {
  const user = useRecoilValue(userState);
  const [modal, setModal] = useState({
    type: '',
    isOpen: false,
  });

  const openModal = (type: string) => {
    setModal({
      type,
      isOpen: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles['user-name']}>{user.nickname}</span>님 안녕하세요😄
      </div>
      <div className={styles.settings}>
        <button className={styles.btn} onClick={() => openModal('change-nickname')}>
          <span>닉네임 변경</span>
          <span>{user.nickname}</span>
        </button>
        <button className={styles.btn} onClick={() => openModal('reset-password')}>
          <span>비밀번호 재설정</span>
          <span>********</span>
        </button>
      </div>
      <SettingsModal
        title="닉네임 변경"
        isOpen={modal.isOpen && modal.type === 'change-nickname'}
        setModal={setModal}
        variant="nickname"
      />
      <SettingsModal
        title="비밀번호 재설정"
        isOpen={modal.isOpen && modal.type === 'reset-password'}
        setModal={setModal}
        variant="password"
      />
    </div>
  );
};

export default MyPage;
