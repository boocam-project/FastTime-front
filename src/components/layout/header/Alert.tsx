import { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const Alert = () => {
  const [isAlertOpen, setAlertOpen] = useState(false);

  const cx = classNames.bind(styles);

  return (
    <div className={styles.alert}>
      <button onClick={() => setAlertOpen(!isAlertOpen)}>알림</button>
      <div className={cx(['userModal'], { open: isAlertOpen })}>
        <div className={styles.modalItem}>
          <Link to="/">알림 1</Link>
        </div>
        <div className={styles.modalItem}>
          <Link to="/">알림 2</Link>
        </div>
        <div className={styles.modalItem}>
          <Link to="/">알림 3</Link>
        </div>
      </div>
    </div>
  );
};

export default Alert;
