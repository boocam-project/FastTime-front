import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import ToggleBar from '../toggleBar';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';
import { instance } from '@/api/client';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '@/assets/logo.svg';
import MobileMenu from './MobileMenu';

const fetchLogout = async () => {
  const response = await instance.get(`api/v1/logout`);
  return response.data;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);

  const navigation = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false); // "닫기" 버튼 클릭 시 메뉴를 닫음
  };

  const showAlert = () => {
    window.alert('준비 중입니다');
  };

  const handleLogoClick = () => {
    navigation('/community');
  };

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
      {isMenuOpen && <MobileMenu onClose={handleMenuClose} />}
      <div className={styles.container}>
        <div className={styles['menu-btn']} onClick={toggleMenu}>
          <AiOutlineMenu />
        </div>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.nav}>
          <div>
            <Link to={'/community'} className={styles['nav-link']}>
              소근소근
            </Link>
          </div>
          <div>
            <Link to={'/'} onClick={showAlert}>
              포트폴리오
            </Link>
          </div>
          <div>
            <Link to={'/'} onClick={showAlert}>
              스터디
            </Link>
          </div>
          <div>
            <Link to={'/'} onClick={showAlert}>
              프로젝트
            </Link>
          </div>
          <div>
            <Link to={'/'} onClick={showAlert}>
              구인구직
            </Link>
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
