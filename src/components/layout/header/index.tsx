import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import ToggleBar from '../toggleBar';
const Header = () => {
  return (
    <>
      <ToggleBar />
      <div className={styles.container}>
        <div className={styles.menuBtn}>
          <AiOutlineMenu />
        </div>
        <div className={styles.logo}>fast time</div>
        <div className={styles.nav}>
          <div>
            <Link to={'/'}>소근소근</Link>
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
          <Link to={'/signin'}>signin</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
