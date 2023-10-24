import { RefObject, useEffect, useState } from 'react';

const useModal = (wrapperRef: RefObject<HTMLElement>) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const currentRef = wrapperRef.current;

    const handleClickOutside = (e: { target: any }) => {
      if (typeof e.target.className === 'string') {
        if (e.target.className.includes('modalBackground')) {
          setModalOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    currentRef?.addEventListener('click', () => setModalOpen(true));
    return () => {
      document.removeEventListener('click', handleClickOutside);
      currentRef?.removeEventListener('click', () => setModalOpen(true));
    };
  }, [wrapperRef]);

  return { modalOpen, setModalOpen };
};

export default useModal;
