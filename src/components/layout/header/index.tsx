import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/recoil/authState';
import { MENU_ITEMS } from '@/constants/menus';
import toast from 'react-hot-toast';
import { signOut } from '@/components/signIn/utils/logout';
import Alert from './Alert';

type MenuType = 'community' | 'study' | 'project' | 'resume' | 'review';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(authState);
  const navigate = useNavigate();

  const cx = classNames.bind(styles);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleProfileClick = (e: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
      setMenuOpen((prev) => !prev);
    } else if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileClick);

    return () => {
      document.removeEventListener('mousedown', handleProfileClick);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const liElement = (e.target as HTMLElement).closest('li');
    if (liElement) {
      const menuItem = liElement.getAttribute('data-menu') as MenuType;
      if (menuItem) {
        if (
          menuItem !== 'community' &&
          menuItem !== 'review' &&
          menuItem !== 'study' &&
          menuItem !== 'resume'
        ) {
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
        <div className={styles.right}>
          {/* 알림 */}
          <Alert />

          <button ref={buttonRef} className={styles.info}>
            <div className={styles.infoMenu}>{/* <img src="" alt="" /> */}</div>
          </button>
          <div
            ref={modalRef}
            className={cx(['userModal'], { open: isMenuOpen })}
            onClick={() => setMenuOpen(false)}
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
