import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './index.module.scss';
import Button from '../atoms/button';
import { useParams } from 'react-router-dom';
import useCommentMutations from '@/hooks/useCommentMutations';

interface Props {
  parentCommentId?: number;
  setReplyingId?: (id: number | null) => void;
}

const CommentInput = ({ parentCommentId, setReplyingId }: Props) => {
  const [content, setContent] = useState('');
  const [anonymity, setAnonymity] = useState<boolean>(false);
  const { id: idString } = useParams();
  const postId = Number(idString);
  const { addMutation } = useCommentMutations();

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);

    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      postId,
      content,
      anonymity,
      parentCommentId,
    };

    addMutation.mutate(data);
    setReplyingId && setReplyingId(null);
    setContent('');
  };

  return (
    <div className={styles['comment-box']}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['content-write']}>
          <textarea
            className={styles.content}
            value={content}
            onChange={handleComment}
            placeholder="댓글을 입력하세요."
          />
          <div className={styles.buttons}>
            <input type="checkbox" id="anonymity" onChange={() => setAnonymity((prev) => !prev)} />
            <label htmlFor="anonymity">익명</label>
            <Button type="submit" className="default-red-200" show>
              등록
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
