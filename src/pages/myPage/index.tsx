import { useState } from 'react';
import SettingsModal from './SettingsModal';
import styles from './index.module.scss';
import MyArticles from '../myArticles';
import MyComments from '../myComments';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/client';

interface UserType {
  id: number;
  nickname: string;
  email: string;
}

const MyPage = () => {
  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await instance.get('/api/v1/mypage');
      return response.data.data;
    },
  });

  console.log('user:', user);

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

  if (isLoading || !user) {
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <span className={styles['user-name']}>{user.nickname}</span> 님 안녕하세요😄
        </div>

        <span className={styles['user-email']}>{user.email}</span>
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
      <MyArticles nickname={user.nickname} />
      <MyComments nickname={user.nickname} />
    </div>
  );
};

export default MyPage;
