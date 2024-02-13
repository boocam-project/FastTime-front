import { Comment } from '@/api/commentService';

interface ParentCommentProps {
  comment: Comment;
}

const ParentComment = ({ comment }: ParentCommentProps) => {
  return <p>{comment.content}</p>;
};

export default ParentComment;
