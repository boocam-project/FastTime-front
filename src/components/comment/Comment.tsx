import { ChangeEvent, useState } from 'react';
import styles from './index.module.scss';
import Button from '../atoms/button';
import CommentList from './CommentList';

const Comment = () => {
  const [content, setContent] = useState();

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(content);

    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <div className={styles['comment-box']}>
      <h2 className={styles.title}>댓글</h2>
      <form className={styles.form} action="">
        <div className={styles['content-write']}>
          <textarea
            // rows={1}
            className={styles.content}
            value={content}
            onChange={handleComment}
            placeholder="댓글을 입력하세요."
          />
          <Button className="default-red-200" type="submit" show>
            등록
          </Button>
        </div>
      </form>
      {/* 댓글 목록 */}
      <CommentList />
    </div>
  );
};

export default Comment;
