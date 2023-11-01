import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ children, isOpen, onClose, title }: Props) => {
  const cx = classNames.bind(styles);

  return (
    isOpen &&
    createPortal(
      <div className={cx('overlay')} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.title}>{title}</h2>
          {children}
          <div className={styles.btns}>
            <button className={styles.close} onClick={onClose}>
              취소
            </button>
            <button className={styles.save}>수정</button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default SettingsModal;
