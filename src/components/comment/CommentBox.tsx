import { instance } from '@/api/client';
import styles from './index.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  content: string;
  id: number;
}

const CommentBox = ({ content, id }: Props) => {
  const [newContent, setContent] = useState(content);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(newContent);

    const response = await instance.patch('api/v1/comment', { id, content: newContent });
    console.log(response.data);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.currentTarget.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea className={styles.content} value={newContent} onChange={handleChange} />
      <button type="button">취소</button>
      <button type="submit">등록</button>
    </form>
  );
};

export default CommentBox;
