import { RefObject, useEffect, useState } from 'react';

const useModal = (wrapperRef: RefObject<HTMLElement>) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (typeof e.target.className === 'string') {
        if (e.target.className.includes('modalBackground')) {
          setModalOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    wrapperRef.current?.addEventListener('click', () => setModalOpen(true));
    return () => {
      document.removeEventListener('click', handleClickOutside);
      wrapperRef.current?.removeEventListener('click', () => setModalOpen(true));
    };
  }, []);
  return { modalOpen, setModalOpen };
};

export default useModal;