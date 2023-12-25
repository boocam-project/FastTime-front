import { useRecoilValue } from 'recoil';
import { editorState } from '../atoms/editor.atom';

const useProcessContent = () => {
  const { content, isAnonymity } = useRecoilValue(editorState);

  const processContent = async () => {
    console.log('Starting content processing');

    const parser = new DOMParser();
    const document = parser.parseFromString(content, 'text/html');

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
