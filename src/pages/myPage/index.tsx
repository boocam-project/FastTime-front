import Input from '@/components/atoms/input';
import { userState } from '@/store/store';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import SettingsModal from './SettingsModal';
import styles from './index.module.scss';

const MyPage = () => {
  const user = useRecoilValue(userState);
  const [nickname, setNickname] = useState(user.nickname);

  // if (!user.isLogin) {
  //   alert('로그인이 필요합니다.');
  //   navigate('/signin');
  // }

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

  const closeModal = () => {
    setModal({
      type: '',
      isOpen: false,
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
        onClose={closeModal}
      >
        <Input name="name" label="닉네임" value={nickname} />
      </SettingsModal>
      <SettingsModal
        title="비밀번호 재설정"
        isOpen={modal.isOpen && modal.type === 'reset-password'}
        onClose={closeModal}
      >
        <Input type="password" name="password" label="비밀번호" value="" placeholder="********" />
        <Input
          type="password"
          name="confirm-password"
          label="비밀번호 확인"
          placeholder="********"
          value=""
        />
      </SettingsModal>
    </div>
  );
};

export default MyPage;
