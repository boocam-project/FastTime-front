import { uploadImageToFirebase } from '@/hooks/useImageConvert';
import { useRecoilValue } from 'recoil';
import { editorState } from '../atoms/editor.atom';

const useProcessContent = () => {
  const { content, isAnonymity } = useRecoilValue(editorState);

  const processContent = async () => {
    console.log('Starting content processing');

    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');

    // TODO: 에러 핸들링 과정 추가
    const images = document.querySelectorAll('img');
    const imageUploads = Array.from(images).map(async (img, index) => {
      console.log(`Processing image ${index}`, img.src);

      try {
        if (img.src.startsWith('https://')) return;
        const blob = await fetch(img.src).then((res) => res.blob());
        const firebaseUrl = await uploadImageToFirebase(blob);
        console.log('Image uploaded. Firebase URL: ', firebaseUrl);
        img.src = firebaseUrl;
      } catch (error) {
        console.error('Error Uploading image:', img.src, error);
      }
    });

    await Promise.all(imageUploads);
    console.log('All image uploads completed');

    const titleEl = document.querySelector('h1');

    // TODO: 제목 없을 때 에러 핸들링
    if (!titleEl || !titleEl.textContent) throw Error('제목이 비어있습니다.');

    const processedTitle = titleEl.textContent;

    if (titleEl) {
      console.log('Removing title element');
      titleEl.remove();
    }

    const processedContent = document.body.innerHTML;
    console.log('Processed content set');

    return { processedContent, processedTitle };
  };

  return { processContent, isAnonymity };
};

export default useProcessContent;
