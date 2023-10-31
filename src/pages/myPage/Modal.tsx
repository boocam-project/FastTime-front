import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ children, isOpen, onClose }: Props) => {
  const cx = classNames.bind(styles);

  return createPortal(
    <div className={cx('overlay', { open: isOpen })} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;
