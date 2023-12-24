import { useEffect } from 'react';

const useAutoSizeTextArea = (ref: HTMLTextAreaElement | null, value: string) => {
  useEffect(() => {
    if (ref) {
      ref.style.height = '0px';
      const scrollHeight = ref.scrollHeight;

      ref.style.height = scrollHeight + 'px';
    }
  }, [ref, value]);
};

export default useAutoSizeTextArea;
