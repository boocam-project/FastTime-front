import { useState } from 'react';
import CommentList from './CommentList';

const CommentContainer = () => {
  const [postId, setPostId] = useState<number>();

  return (
    <>
      <button onClick={() => setPostId(1)}>1</button>
      <button onClick={() => setPostId(2)}>2</button>
      <button onClick={() => setPostId(3)}>3</button>
      <button onClick={() => setPostId(4)}>4</button>
      <CommentList postId={postId} />
    </>
  );
};

export default CommentContainer;
