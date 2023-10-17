import classNames from 'classnames/bind';
import styles from './toggleBar.module.scss';
const ToggleBar = () => {
  const cx = classNames.bind(styles);
  return (
    <div className={styles.container}>
      <span className={cx('text')}>매주 새로운 포트폴리오가 올라옵니다!</span>
      <button className={cx('deleteBtn')}>X</button>
    </div>
  );
};

export default ToggleBar;
