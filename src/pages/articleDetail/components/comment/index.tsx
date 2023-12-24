import useComments from '../../hooks/useComments';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentArea = () => {
  const { data } = useComments();

  return (
    <>
      <h1>댓글 {data?.pages[0].totalComments}</h1>
      <CommentInput />
      <CommentList />
    </>
  );
};

export default CommentArea;
