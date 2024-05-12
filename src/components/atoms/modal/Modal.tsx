import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ModalContext, useModal } from './ModalContext';

interface ModalRootProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalRootProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (overlayRef.current && overlayRef.current.contains(e.currentTarget as Node)) {
        closeModal();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
};

export default ModalProvider;

interface ModalTriggerProps {
  children: React.ReactNode;
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const { openModal } = useModal();

  return (
    <div id="modal-trigger" onClick={openModal}>
      {children}
    </div>
  );
};

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { closeModal, isOpen } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (overlayRef.current && overlayRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div ref={overlayRef} className={styles.overlay}></div>
      <div className={styles.modal}>
        <button onClick={closeModal} className={styles.closeButton}>
          닫기
        </button>
        {children}
      </div>
    </>,
    document.body
  );
};

export { ModalProvider, ModalTrigger, Modal };
