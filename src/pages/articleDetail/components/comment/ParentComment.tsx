import { Comment } from '@/api/commentService';

interface ParentCommentProps {
  comment: Comment;
}

const ParentComment = ({ comment }: ParentCommentProps) => {
  return <div>{comment.content}</div>;
};

export default ParentComment;
