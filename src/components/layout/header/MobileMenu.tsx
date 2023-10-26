import React from 'react';
import styles from './mobileMenu.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  return (
    <div className={styles.mobileMenu}>
      <button onClick={onClose} className={styles.closeButton}>
        <AiOutlineClose />
      </button>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link to="/community">소근소근</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/">포트폴리오</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/">스터디</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/">프로젝트</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/">구인구직</Link>
        </li>
        {/* 필요한 메뉴 항목을 추가하세요 */}
      </ul>
    </div>
  );
};

export default MobileMenu;
