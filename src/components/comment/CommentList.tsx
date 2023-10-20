import { organizeComments } from './organizeComments';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';
import { instance } from '@/api/client';
import { useState } from 'react';
import CommentEdit from './CommentEdit';
import CommentInput from './CommentInput';
import { useQuery } from '@tanstack/react-query';
import { formatTime } from '../community/changeTimeFormat';
import CommentSkeletons from './CommentSkeletons';

const fetchComments = async (postId: number) => {
  const response = await instance.get(`api/v1/comment/${postId}`);
  return response.data.data;
};

const CommentList = () => {
  const { id: idString } = useParams();
  const postId = Number(idString);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const { data: comments, isLoading: commentLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(postId),
  });

  if (!comments) return <div>댓글이 없습니다.</div>;
  const organizedComments = organizeComments(comments);

  const handleDelete = async (id: number) => {
    console.log(id);

    const response = await instance.delete('api/v1/comment', { data: { id } });
    console.log(response.data);
  };

  const handleEditComment = (id: number) => {
    if (editingCommentId === id) {
      setEditingCommentId(null);
    } else {
      setEditingCommentId(id);
    }
  };

  const handleAddReply = (id: number) => {
    if (replyingId === id) {
      setReplyingId(null);
    } else {
      setReplyingId(id);
    }
  };

  return (
    <div className={styles['comment-list']}>
      {commentLoading || !comments ? (
        <CommentSkeletons />
      ) : (
        organizedComments.map((comment) => (
          <ul className={styles.comments} key={comment.id}>
            {editingCommentId === comment.id ? (
              <CommentEdit
                content={comment.content}
                id={comment.id}
                setEditingCommentId={setEditingCommentId}
              />
            ) : (
              <li className={styles.parent}>
                <div className={styles.above}>
                  <div className={styles['comment-info']}>
                    <span className={styles.username}>
                      {comment.anonymity ? '익명' : comment.nickname}
                    </span>
                    <span className={styles.date}>{formatTime(comment.createdAt)}</span>
                    {comment.updatedAt ? <span>수정됨</span> : null}
                  </div>
                  <div className={styles.buttons}>
                    <button className={styles.edit} onClick={() => handleEditComment(comment.id)}>
                      수정
                    </button>
                    <button className={styles.delete} onClick={() => handleDelete(comment.id)}>
                      삭제
                    </button>
                  </div>
                </div>
                <span className={styles.content}>{comment.content}</span>
                <button
                  type="button"
                  className={styles['reply-btn']}
                  onClick={() => handleAddReply(comment.id)}
                >
                  답글 달기
                </button>
                {replyingId === comment.id ? <CommentInput parentCommentId={comment.id} /> : null}
              </li>
            )}

            {comment.children?.map((reply) =>
              editingCommentId === reply.id ? (
                <CommentEdit
                  key={reply.id}
                  content={reply.content}
                  id={reply.id}
                  setEditingCommentId={setEditingCommentId}
                />
              ) : (
                <li key={reply.id} className={styles.child}>
                  <div className={styles.above}>
                    <div className={styles['comment-info']}>
                      <span className={styles.username}>
                        {reply.anonymity ? '익명' : reply.nickname}
                      </span>
                      <span className={styles.date}>{formatTime(reply.createdAt)}</span>
                      {comment.updatedAt ? <span>수정됨</span> : null}
                    </div>
                    <div className={styles.buttons}>
                      <button className={styles.edit} onClick={() => handleEditComment(reply.id)}>
                        수정
                      </button>
                      <button className={styles.delete} onClick={() => handleDelete(reply.id)}>
                        삭제
                      </button>
                    </div>
                  </div>
                  <span className={styles.content}>{reply.content}</span>
                </li>
              )
            )}
          </ul>
        ))
      )}
    </div>
  );
};

export default CommentList;
