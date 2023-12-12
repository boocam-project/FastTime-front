import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { ChangeEvent, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { instance } from '@/api/client';
import Input from '@/components/atoms/input';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/store';

interface Props {
  title: string;
  children?: ReactNode;
  isOpen: boolean;
  variant?: 'nickname' | 'password';
  setModal: (value: { type: string; isOpen: boolean }) => void;
}

const SettingsModal = ({ isOpen, title, variant, setModal }: Props) => {
  const user = useRecoilValue(userState);
  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const cx = classNames.bind(styles);

  const closeModal = () => {
    setModal({
      type: '',
      isOpen: false,
    });
    setNickname(user.nickname);
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const checkPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setConfirmPassword(value);
    if (value !== password) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setErrorMessage('');
    }
  };

  const handleChangeName = async () => {
    try {
      const response = await instance.put('/api/v1/retouch-member', {
        nickname,
      });
      if (response.status === 200) {
        alert('닉네임 변경 성공');
        closeModal();
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

    try {
      const response = await instance.post('/api/v1/RePassword', {
        password,
        rePassword: confirmPassword,
      });
      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다.');
        closeModal();
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const handleSave = () => {
    if (variant === 'nickname') {
      handleChangeName();
    }
    if (variant === 'password') {
      handleChangePassword();
    }
  };

  return (
    isOpen &&
    createPortal(
      <div className={cx('overlay')} onClick={closeModal}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.title}>{title}</h2>
          {variant === 'nickname' ? (
            <Input
              name="name"
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          ) : (
            <>
              <Input
                type="password"
                name="password"
                label="비밀번호"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                type="password"
                name="confirm-password"
                label="비밀번호 확인"
                placeholder="********"
                value={confirmPassword}
                onChange={checkPassword}
              />
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </>
          )}
          <div className={styles.btns}>
            <button className={styles.close} onClick={closeModal}>
              취소
            </button>
            <button className={styles.save} onClick={handleSave}>
              수정
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default SettingsModal;
