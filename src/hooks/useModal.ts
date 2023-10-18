import { RefObject, useEffect, useState } from 'react';

const useModal = (wrapperRef: RefObject<HTMLElement>) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (e.target.className.includes('modalBackground')) {
        setModalOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    wrapperRef.current?.addEventListener('click', () => setModalOpen(true));
    return () => {
      document.removeEventListener('click', handleClickOutside);
      wrapperRef.current?.removeEventListener('click', () => setModalOpen(true));
    };
  }, []);
  return modalOpen;
};

export default useModal;
