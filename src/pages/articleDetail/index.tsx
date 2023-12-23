import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { AiTwotoneAlert } from 'react-icons/ai';
import { instance } from '@/api/client';
import useLikeMutations from '@/hooks/useLikeMutations';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import Article from './components/article/Article';
import CommentArea from './components/comment';

const ArticleDetailPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const { data: like } = useQuery({
    queryKey: ['like', postId],
    queryFn: async () => {
      const response = await instance.get(`api/v1/record/${postId}`);
      console.log(response.data);

      return response.data.data;
    },
    initialData: {
      isLike: false,
    },
  });
  const { likeMutation, unlikeMutation } = useLikeMutations();

  const handleReport = async () => {
    try {
      await instance.post('api/v1/report', {
        postId: postId,
      });
      alert('신고가 접수되었습니다.');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          alert('로그인 후 이용해주세요.');
          navigate('/signin');
        } else if (error.response?.status === 400) {
          alert('이미 신고한 게시글입니다.');
        }
      }
    }
  };

  const handleLike = () => {
    if (like?.isLike) {
      unlikeMutation.mutate(parseInt(postId!));
    } else {
      likeMutation.mutate(parseInt(postId!));
    }
  };

  return (
    <>
      <div className={styles['article-details']}>
        <Article />
        {/* TODO: 다른 컴포넌트로 빼면 좋을 듯 */}
        <div className={styles['bottom-menus']}>
          {like && (
            <button className={styles.btn} type="button" onClick={handleLike}>
              {like.isLike ? <PiHeartStraightFill size={20} /> : <PiHeartStraightLight size={20} />}
            </button>
          )}
          {/* <span className={styles['like-count']}>{article.likeCount}</span> */}
          <button className={styles.btn} type="button" onClick={handleReport}>
            <AiTwotoneAlert size={20} />
          </button>
        </div>
      </div>
      <div className={styles.comments}>
        <h2>댓글</h2>
        <CommentArea />
      </div>
    </>
  );
};

export default ArticleDetailPage;
