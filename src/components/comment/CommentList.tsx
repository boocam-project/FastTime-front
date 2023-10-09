import { comments } from '@/data/comment';
import styles from './index.module.scss';
import CommentItem from './CommentItem';
import { organizeComments } from './organizeComments';

interface Props {
  postId?: number;
}

const CommentList = ({ postId }: Props) => {
  // 포스트에 맞는 댓글 중 최상단 댓글만 필터링
  const filteredComments = comments.filter((comment) => comment.postId === postId);
  const organizedComments = organizeComments(filteredComments);

  return (
    <div className={styles.container}>
      {organizedComments.length > 0 ? (
        organizedComments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
      ) : (
        <span>댓글이 없습니다.</span>
      )}
    </div>
  );
};

export default CommentList;
