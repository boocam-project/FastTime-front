import { Comment } from '@/data/comment';

interface CommentMap {
  [key: number]: Comment;
}

export const organizeComments = (comments: Comment[]) => {
  const commentMap: CommentMap = {};
  const rootComments: Comment[] = [];

  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, children: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentCommentId) {
      commentMap[comment.parentCommentId].children?.push(commentMap[comment.id]);
    } else {
      rootComments.push(commentMap[comment.id]);
    }
  });

  return rootComments;
};
