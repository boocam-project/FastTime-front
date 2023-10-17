import { instance } from '@/api/client';
import styles from './edit.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  content: string;
  id: number;
  setEditingCommentId: (id: number | null) => void;
}

const CommentEdit = ({ content, id, setEditingCommentId }: Props) => {
  const [newContent, setContent] = useState(content);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(newContent);

    try {
      const response = await instance.patch('api/v1/comment', { id, content: newContent });
      console.log(response.data);

      if (response.status === 200) {
        setEditingCommentId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.currentTarget.value);
  };

  return (
    <>
      {/* 수정 버튼 클릭 시 */}
      <form className={styles.form} onSubmit={onSubmit}>
        <textarea className={styles.content} value={newContent} onChange={handleChange} />
        <div className={styles.btns}>
          <button type="button" onClick={() => setEditingCommentId(null)}>
            취소
          </button>
          <button type="submit">등록</button>
        </div>
      </form>
    </>
  );
};

export default CommentEdit;
