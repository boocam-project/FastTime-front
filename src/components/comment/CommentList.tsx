import { Comment } from '@/data/comment';
import { organizeComments } from './organizeComments';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { instance } from '@/api/client';

const CommentList = () => {
  const { id: idString } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const id = Number(idString);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await instance.get(`api/v1/comment/${id}`);
      console.log(response.data);
      setComments(response.data.data);
    };
    fetchComments();
  }, [id]);

  const organizedComments = organizeComments(comments);

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
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
