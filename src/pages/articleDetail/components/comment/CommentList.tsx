import useComments from '../../hooks/useComments';
import ParentComment from './ParentComment';

const CommentList = () => {
  const { data, isLoading } = useComments();

  if (isLoading) return null;

  const hasNoComments = data?.pages[0].comments.length === 0 || !data;

  if (hasNoComments) return <div>There&apos;s no comment.</div>;

  return (
    <div>
      {data?.pages.map((page) =>
        page.comments.map((comment) => <ParentComment comment={comment} key={comment.commentId} />)
      )}
    </div>
  );
};

export default CommentList;
