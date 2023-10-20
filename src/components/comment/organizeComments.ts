import { Comment } from '@/data/comment';

interface CommentMap {
  [key: number]: Comment;
}

export const organizeComments = (comments: Comment[]) => {
  const commentMap: CommentMap = {};
  const rootComments: Comment[] = [];

  const filteredComments = comments.filter((comment) => comment.deletedAt == null);

  filteredComments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, children: [] };
  });

  filteredComments.forEach((comment) => {
    if (comment.parentCommentId) {
      commentMap[comment.parentCommentId].children?.push(commentMap[comment.id]);
    } else {
      rootComments.push(commentMap[comment.id]);
    }
  });

  return rootComments;
};
