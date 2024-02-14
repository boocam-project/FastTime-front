import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/recoil/authState';
import { MENU_ITEMS } from '@/constants/menus';
import toast from 'react-hot-toast';
import { signOut } from '@/components/signIn/utils/logout';

type MenuType = 'community' | 'study' | 'project' | 'portfolio' | 'review';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(authState);
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
        if (menuItem !== 'community' && menuItem !== 'review') {
          alert('준비중입니다.');
          navigate(`/community`);
        }
        setSelectedMenu(menuItem);
      }
    }
  };

  const handleLogout = async () => {
    setUser({ memberId: null, email: null, nickname: null, image: null, loggedIn: false });
    toast.promise(signOut(), {
      loading: '잠시만 기다려주세요',
      success: '로그아웃 되었습니다.',
      error: '로그아웃에 실패했습니다',
    });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to={'/community'}>
            FAST
            <img src="logo.svg" alt="Logo" style={{ width: '20px', padding: '2px' }} />
            TIME
          </Link>
        </div>
        <button ref={buttonRef} className={styles.info}>
          <div className={styles.infoMenu}>{/* <img src="" alt="" /> */}</div>
        </button>

        <div
          ref={modalRef}
          className={cx(['user-modal'], { open: isMenuOpen })}
          onClick={() => setIsMenuOpen(false)}
        >
          {user.loggedIn ? (
            <>
              <div className={styles.modalItem}>
                {/* TODO: settings로 주소 바꾸기 */}
                <Link to={'/mypage'}>계정</Link>
              </div>
              <div className={styles.modalItem}>
                {/* 로그아웃이 완료 되면서 게시글 페이지로 이동 */}
                <a onClick={handleLogout}>로그아웃</a>
                <div className={styles['user-name']}>{user.nickname}</div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.modalItem}>
                <Link to={'/signin'}>로그인</Link>
              </div>
              <div className={styles.modalItem}>
                <Link to={'/signup'}>회원가입</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.nav}>
        <ul className={styles.menus} onClick={handleMenuClick}>
          {MENU_ITEMS.map((menu) => (
            <li
              key={menu.path}
              className={cx('menuItem', {
                selected: selectedMenu === menu.path,
              })}
              data-menu={menu.path}
            >
              <Link to={`/${menu.path}`}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.spacer} />
    </>
  );
};

export default Header;
