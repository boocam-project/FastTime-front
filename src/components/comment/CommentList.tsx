import { Comment } from '@/data/comment';
import { organizeComments } from './organizeComments';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';
import useData, { HttpMethod } from '@/hooks/useData';
import { formatTime } from './formatTime';
import { instance } from '@/api/client';
import { useState } from 'react';
import CommentBox from './CommentBox';

const CommentList = () => {
  const { id: idString } = useParams();
  const postId = Number(idString);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { data: comments, isLoading: commentLoading } = useData<Comment[]>(
    HttpMethod.GET,
    `api/v1/comment/${postId}`
  );

  if (commentLoading) return <div>로딩중...</div>;
  if (!comments) return <div>댓글이 없습니다.</div>;
  const organizedComments = organizeComments(comments);

  const handleDelete = async (id: number) => {
    console.log(id);

    const response = await instance.delete('api/v1/comment', { data: { id } });
    console.log(response.data);
  };

  return (
    <div className={styles['comment-list']}>
      {organizedComments.map((comment) => (
        <ul className={styles.comments} key={comment.id}>
          {editingCommentId === comment.id ? (
            <CommentBox content={comment.content} id={comment.id} />
          ) : (
            <li className={styles.parent}>
              <div className={styles.above}>
                <div className={styles['comment-info']}>
                  <span className={styles.username}>{comment.nickname}</span>
                  <span className={styles.date}>{formatTime(comment.createdAt)}</span>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.edit} onClick={() => setEditingCommentId(comment.id)}>
                    수정
                  </button>
                  <button className={styles.delete} onClick={() => handleDelete(comment.id)}>
                    삭제
                  </button>
                </div>
              </div>
              <span className={styles.content}>{comment.content}</span>
              <button className={styles['reply-btn']}>답글 달기</button>
            </li>
          )}

          {comment.children?.map((reply) => (
            <li key={reply.id} className={styles.child}>
              <div className={styles.above}>
                <div className={styles['comment-info']}>
                  <span className={styles.username}>{comment.nickname}</span>
                  <span className={styles.date}>{formatTime(comment.createdAt)}</span>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.edit}>수정</button>
                  <button className={styles.delete} onClick={() => handleDelete(comment.id)}>
                    삭제
                  </button>
                </div>
              </div>
              <span className={styles.content}>{reply.content}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
