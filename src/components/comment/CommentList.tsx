import { comments } from '@/data/comment';
import { organizeComments } from './organizeComments';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';

const CommentList = () => {
  const { id: idString } = useParams();
  const id = Number(idString);
  // 포스트에 맞는 댓글 중 최상단 댓글만 필터링
  const filteredComments = comments.filter((comment) => comment.postId === id);
  const organizedComments = organizeComments(filteredComments);

  return (
    <div className={styles['comment-list']}>
      {organizedComments.map((comment) => (
        <ul className={styles.comments} key={comment.id}>
          <li className={styles.parent}>
            <span className={styles.content}>{comment.content}</span>
            <span className={styles.date}>{comment.createdAt}</span>
            <button className={styles['reply-btn']}>답글 달기</button>
          </li>

          {comment.children?.map((reply) => (
            <li key={reply.id} className={styles.child}>
              <span className={styles.content}>{reply.content}</span>
              <span className={styles.date}>{reply.createdAt}</span>
              <button className={styles['reply-btn']}>답글 달기</button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
