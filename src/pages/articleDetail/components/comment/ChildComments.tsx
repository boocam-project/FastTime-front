import { useChildComments } from '../../hooks/useComments';
import styles from './ChildComments.module.scss';

interface ChildCommentsProps {
  parentCommentId: number;
}

const ChildComments = ({ parentCommentId }: ChildCommentsProps) => {
  const { data, isLoading } = useChildComments(parentCommentId);

  const childComments = data?.pages.flatMap((page) => page.comments);

  if (isLoading) {
    return <div className={styles.loadingSpinner} />;
  }

  return (
    <div className={styles.childCommentWrapper}>
      {childComments?.map((comment) => <p key={comment.commentId}>{comment.content}</p>)}
    </div>
  );
};

export default ChildComments;
