import classNames from 'classnames/bind';
import { Comment } from '@/data/comment';
import styles from './index.module.scss';

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const cx = classNames.bind(styles);
  const isParent = !comment.parentCommentId;

  return (
    <div className={cx('comment-wrapper', { child: !isParent })}>
      <div>{comment.content}</div>
      <div>{comment.createdAt}</div>
      <div>{comment.children?.map((child) => <CommentItem key={child.id} comment={child} />)}</div>
    </div>
  );
};

export default CommentItem;
