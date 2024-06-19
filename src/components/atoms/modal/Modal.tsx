import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { useState } from 'react';
import { ModalContext, useModal } from './ModalContext';

interface ModalRootProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

interface ModalTriggerProps {
  children: React.ReactNode;
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const { openModal } = useModal();

  return <div onClick={openModal}>{children}</div>;
};

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { closeModal, isOpen } = useModal();

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <button onClick={closeModal} className={styles.closeButton}>
        닫기
      </button>
      {children}
    </div>,
    document.body
  );
};

export { ModalProvider, ModalTrigger, Modal };
