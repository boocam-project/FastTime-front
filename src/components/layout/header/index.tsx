import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import ToggleBar from '../toggleBar';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';
import { instance } from '@/api/client';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '@/assets/logo.svg';

const fetchLogout = async () => {
  const response = await instance.get(`api/v1/logout`);
  return response.data;
};

const Header = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const navigation = useNavigate();

  const logoutHandler = () => {
    const fetchData = async () => {
      const result = await fetchLogout();
      if (result.code === 200) {
        setUserData({ ...userData, login: false });
        if (userData.nickname === '관리자') {
          navigation('/admin/login');
        } else {
          navigation('/signin');
        }
      }
    };
    fetchData();
  };

  return (
    <>
      <ToggleBar />
      <div className={styles.container}>
        <div className={styles['menu-btn']}>
          <AiOutlineMenu />
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.nav}>
          <div>
            <Link to={'/community'}>소근소근</Link>
          </div>
          <div>
            <Link to={'/'}>포트폴리오</Link>
          </div>
          <div>
            <Link to={'/'}>스터디</Link>
          </div>
          <div>
            <Link to={'/'}>프로젝트</Link>
          </div>
          <div>
            <Link to={'/'}>구인구직</Link>
          </div>
        </div>
        <div className={styles.signin}>
          {userData.login ? (
            <>
              <button onClick={logoutHandler}>logout</button>
              {userData.nickname === '관리자' ? (
                <></>
              ) : (
                <AiOutlineUser onClick={() => navigation('/mypage')} />
              )}
            </>
          ) : (
            <Link to={'/signin'}>signin</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
