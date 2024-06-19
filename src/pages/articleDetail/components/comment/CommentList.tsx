import { useState } from 'react';
import { useParentComments } from '../../hooks/useComments';
import ChildComments from './ChildComments';
import ParentComment from './ParentComment';
import styles from './CommentList.module.scss';
import CommentInput from './CommentInput';
import Button from '@/components/atoms/button/Button';

const CommentList = () => {
  const { data, isLoading } = useParentComments();
  const [childCommentsIds, setChildCommentsIds] = useState<number[]>([]);
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);

  const toggleReply = (commentId: number) => {
    setReplyCommentId((prev) => (prev === commentId ? null : commentId));
  };

  const toggleChildComments = (commentId: number) => {
    setChildCommentsIds((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };

  if (isLoading) return null;

  const hasNoComments = data?.pages[0].comments.length === 0 || !data;

  if (hasNoComments) return <div>There&apos;s no comment.</div>;

  return (
    <div>
      {data?.pages.map((page) =>
        page.comments.map((comment) => (
          <div key={comment.commentId} className={styles.commentWrapper}>
            <ParentComment comment={comment} />
            <Button variant="text" onClick={() => toggleReply(comment.commentId)}>
              {replyCommentId === comment.commentId ? '숨기기' : '답글 달기'}
            </Button>
            {replyCommentId === comment.commentId && (
              <div className={styles.replyCommentWrapper}>
                <CommentInput parentCommentId={comment.commentId} />
              </div>
            )}
            {childCommentsIds.includes(comment.commentId) ? (
              <ChildComments parentCommentId={comment.commentId} />
            ) : (
              comment.childCommentCount > 0 && (
                <Button variant="text" onClick={() => toggleChildComments(comment.commentId)}>
                  — 답글 {comment.childCommentCount}개 더 보기
                </Button>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
