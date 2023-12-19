import './styles.scss';

import { EditorContent, useEditor } from '@tiptap/react';

import MenuBar from './components/MenuBar';

import { instance } from '@/api/client';
import Button from '@/components/atoms/button';
import { userState } from '@/store/store';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useBlobUrl from '../../hooks/useBlobUrl';
import { createBlob, uploadImageToFirebase } from '../../hooks/useImageConvert';
import { extensions } from './extensions';

interface Props {
  oldContent?: string;
  oldTitle?: string;
  mode?: 'edit' | 'write';
  postId?: number;
}

const TextEditor = ({ oldContent, oldTitle, mode, postId }: Props) => {
  const { createBlobUrl } = useBlobUrl();
  const { id } = useRecoilValue(userState);
  const [anonymity, setAnonymity] = useState(false);
  const navigate = useNavigate();

  const content = oldContent ? `<h1>${oldTitle}</h1> ${oldContent}` : `<p></p>`;

  const editor = useEditor({
    extensions,
    content,
    // TODO: 이 로직을 어딘가로 옮겨야 함
    editorProps: {
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          const fileSize = Number((file.size / 1024 / 1024).toFixed(4)); // MB
          if ((file.type === 'image/jpeg' || file.type === 'image/png') && fileSize < 10) {
            const blobUrl = createBlobUrl(file);

            const { tr } = view.state;
            const imageNode = view.state.schema.nodes.image.create({ src: blobUrl });
            const transaction = tr.replaceSelectionWith(imageNode);
            view.dispatch(transaction);
          } else {
            alert('이미지는 jpeg, png 형식만 가능합니다. (10MB 이하)');
          }
          return true;
        }
        return false;
      },
    },
  });

  // TODO: 세부적으로 추상화 할 것
  const handlePublish = async () => {
    if (!editor) return;

    try {
      const articleHTML = editor.getHTML();

      if (!articleHTML) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(articleHTML, 'text/html');
      const images = doc.querySelectorAll('img');

      const uploadImageAndChangeURL = Array.from(images).map(async (image) => {
        const blobUrl = image.src;
        const blob = await createBlob(blobUrl);
        const downloadUrl = await uploadImageToFirebase(blob);

        image.src = downloadUrl;
      });

      await Promise.all(uploadImageAndChangeURL);

      const titleNode = doc.querySelector('h1');
      if (!titleNode || !titleNode.textContent) {
        alert('제목을 입력해주세요');
        return;
      }

      titleNode.remove();

      const updatedHTML = doc.body.innerHTML;

      const article =
        mode === 'edit'
          ? {
              postId,
              memberId: id,
              title: titleNode.textContent,
              content: updatedHTML,
            }
          : {
              memberId: id,
              title: titleNode.textContent,
              content: updatedHTML,
              anonymity: anonymity,
            };

      let response;

      if (mode === 'edit') {
        response = await instance.patch('/api/v1/post', article);
        console.log(response.data);
      } else {
        response = await instance.post('/api/v1/post', article);
        console.log(response.data);
      }

      const newPostId = mode === 'edit' ? postId : response.data.data.id;
      navigate(`/community/${newPostId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      navigate(`/community/${postId}`);
    } else {
      navigate('/community');
    }
  };

  return (
    <div className="editor-container">
      {editor && (
        <div className="editor-main">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
      <div className="editor-footer">
        <input
          type="checkbox"
          name="anonymity"
          id="anonymity"
          checked={anonymity}
          onChange={(e) => {
            setAnonymity(e.currentTarget.checked);
          }}
        />
        <label htmlFor="anonymity">익명</label>
        <Button type="button" className="compact-red-200" show onClick={handleCancel}>
          취소
        </Button>
        <Button type="button" className="compact-red-200" show onClick={handlePublish}>
          {mode === 'edit' ? '수정' : '발행'}
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
