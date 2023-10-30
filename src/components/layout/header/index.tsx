import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { instance } from '@/api/client';
import { AxiosError } from 'axios';
import { userState } from '@/store/store';
import { useRecoilState } from 'recoil';

type MenuType = 'community' | 'study' | 'project' | 'portfolio';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const cx = classNames.bind(styles);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleProfileClick = (e: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
      setIsMenuOpen((prev) => !prev);
    } else if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileClick);

    return () => {
      document.removeEventListener('mousedown', handleProfileClick);
    };
  }, []);
  // useEffect가 마지막에 실행되는 이유는?
  // 그리기 전에 아무것도 없는데 이벤트를 부착할 수 없으니까
  // useRef는 언제 쓰는 거?
  // DOM에 접근할 때 -> 특정 요소를 찾고(?) 싶을 때, 있나 없나 확인할 때
  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const liElement = (e.target as HTMLElement).closest('li');
    if (liElement) {
      const menuItem = liElement.getAttribute('data-menu') as MenuType;
      if (menuItem) {
        if (menuItem !== 'community') {
          alert('준비중입니다.');
          navigate(`/community`);
        }
        setSelectedMenu(menuItem);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await instance.get('api/v1/logout');
      if (response.status === 200) {
        setUser({ ...user, isLogin: false });
        navigate('/signin');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>FAST TIME</div>
        <button ref={buttonRef} className={styles.info}>
          <div className={styles['info-menu']}>
            {/* <img src="" alt="" /> */}
            <div className={styles['user-image']}></div>
          </div>
        </button>

        <div
          ref={modalRef}
          className={cx(['user-modal'], { open: isMenuOpen })}
          onClick={() => setIsMenuOpen(false)}
        >
          {user.isLogin ? (
            <>
              <div className={styles['modal-items']}>
                {/* TODO: settings로 주소 바꾸기 */}
                <Link to={'/mypage'}>계정</Link>
              </div>
              <div className={styles['modal-items']}>
                {/* 로그아웃이 완료 되면서 게시글 페이지로 이동 */}
                <a onClick={handleLogout}>로그아웃</a>
                <div className={styles['user-name']}>{user.nickname}</div>
              </div>
            </>
          ) : (
            <>
              <div className={styles['modal-items']}>
                <Link to={'/signin'}>로그인</Link>
              </div>
              <div className={styles['modal-items']}>
                <Link to={'/signup'}>회원가입</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.nav}>
        <ul className={styles.menus} onClick={handleMenuClick}>
          <li
            className={cx(['menu-item'], {
              selected: selectedMenu === 'community',
            })}
            data-menu="community"
          >
            <Link to={'/community'}>소근소근</Link>
          </li>
          <li
            className={cx(['menu-item'], {
              selected: selectedMenu === 'study',
            })}
            data-menu="study"
          >
            <Link to={'/study'}>스터디</Link>
          </li>
          <li
            className={cx(['menu-item'], {
              selected: selectedMenu === 'project',
            })}
            data-menu="project"
          >
            <Link to={'/project'}>프로젝트</Link>
          </li>
          <li
            className={cx(['menu-item'], {
              selected: selectedMenu === 'portfolio',
            })}
            data-menu="portfolio"
          >
            <Link to={'/portfolio'}>포트폴리오</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
