import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { AiTwotoneAlert } from 'react-icons/ai';
import { instance } from '@/api/client';
import useLikeMutations from '@/hooks/useLikeMutations';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ReactComponent as HeartFill } from '@/assets/icons/heart_filled.svg';
import { ReactComponent as HeartLine } from '@/assets/icons/heart_lined.svg';

import ArticleArea from './components/article';
import CommentArea from './components/comment';
import { ENDPOINTS } from '@/api/apiConfig';

const ArticleDetailPage = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const { data: like } = useQuery({
    queryKey: ['like', postId],
    queryFn: async () => {
      const response = await instance.get(`${ENDPOINTS.like}/${postId}`);
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
        <ArticleArea />
        {/* TODO: 다른 컴포넌트로 빼면 좋을 듯 */}
        <div className={styles['bottom-menus']}>
          {like && (
            <button className={styles.btn} type="button" onClick={handleLike}>
              {like.isLike ? <HeartFill /> : <HeartLine />}
            </button>
          )}
          <button className={styles.btn} type="button" onClick={handleReport}>
            <AiTwotoneAlert size={20} />
          </button>
        </div>
      </div>
      <div className={styles.comments}>
        <CommentArea />
      </div>
    </>
  );
};

export default ArticleDetailPage;
