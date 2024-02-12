import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { instance } from '@/api/client';
import { ENDPOINTS } from '@/api/apiConfig';

interface Comment {
  id: number;
  postId: number;
  content: string;
}

const MyComments = ({ nickname }: { nickname: string }) => {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', nickname],
    queryFn: async () => {
      const response = await instance.get(`${ENDPOINTS.comments}/`);
      return response.data.data;
    },
  });

  if (isLoading) {
    // TODO: 로딩 스켈레톤 추가
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>나의 댓글 ({comments?.length})</h3>
      <ul className={styles.articles}>
        {comments && comments.length > 0 ? (
          comments?.map((comment) => (
            <li key={comment.id}>
              <Link to={`/community/${comment.postId}`}>
                <span className={styles.content}>{comment.content}</span>
              </Link>
            </li>
          ))
        ) : (
          <span>작성한 댓글이 없습니다.</span>
        )}
      </ul>
    </div>
  );
};

export default MyComments;
