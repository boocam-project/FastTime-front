import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './index.module.scss';
import Button from '../atoms/button';
import CommentList from './CommentList';
import { instance } from '@/api/client';

interface Props {
  postId: number;
}

const Comment = ({ postId }: Props) => {
  const [content, setContent] = useState('');
  const [anonymity, setAnonymity] = useState<boolean>(false);

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);

    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      postId,
      memberId: 1,
      content,
      anonymity,
      parentCommentId: null,
    };

    console.log(data);

    const response = await instance.post('api/v1/comment', data);
    console.log(response.status);
  };

  return (
    <div className={styles['comment-box']}>
      <h2 className={styles.title}>댓글</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['content-write']}>
          <textarea
            // rows={1}
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
      {/* 댓글 목록 */}
      <CommentList />
    </div>
  );
};

export default Comment;
