import { useNavigate, useParams } from 'react-router-dom';

import styles from './details.module.scss';

import { AiTwotoneAlert } from 'react-icons/ai';

import useData, { HttpMethod } from '@/hooks/useData';
import { Article } from './articles';
import CommentInput from '../comment/CommentInput';
import CommentList from '../comment/CommentList';
import { instance } from '@/api/client';
import parser from 'html-react-parser';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/store';
import { AxiosError } from 'axios';
import { formatTime } from './changeTimeFormat';
import ArticleSkeletons from './ArticleSkeletons';
import { useQuery } from '@tanstack/react-query';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import useLikeMutations from '@/hooks/useLikeMutations';

const ArticleDetail = () => {
  const { id: idString } = useParams();
  const user = useRecoilState(userState);
  const navigate = useNavigate();

  const postId = Number(idString);
  const { data: article, isLoading } = useData<Article>(HttpMethod.GET, `api/v1/post/${postId}`);

  const { data: like } = useQuery({
    queryKey: ['like', postId],
    queryFn: async () => {
      const response = await instance.get(`api/v1/record/${postId}`);
      console.log(response.data);

      return response.data.data;
    },
  });
  const { likeMutation, unlikeMutation } = useLikeMutations();

  const content = parser(article?.content || '');
  const isValidUser = user[0].nickname === article?.nickname;

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`api/v1/post`, {
        data: {
          postId: postId,
          memberId: 1,
        },
      });
      console.log(response.data);

      navigate('/community');
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

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
      unlikeMutation.mutate(postId);
    } else {
      likeMutation.mutate(postId);
    }
  };

  return (
    <>
      <div className={styles['article-details']}>
        {isLoading || !article ? (
          <ArticleSkeletons />
        ) : (
          <>
            <h1>{article.title}</h1>
            <div className={styles.info}>
              <div>
                <span className={styles.name}>{article.nickname}</span>
                <span className={styles.date}>{formatTime(article.createdAt)}</span>
              </div>
              {isValidUser && (
                <div className={styles.btns}>
                  <button className={styles.btn} type="button" onClick={handleEdit}>
                    수정
                  </button>
                  <button className={styles.btn} type="button" onClick={handleDelete}>
                    삭제
                  </button>
                </div>
              )}
            </div>
            <div>{content}</div>
            {/* TODO: 다른 컴포넌트로 빼면 좋을 듯 */}
            <div className={styles['bottom-menus']}>
              {like && (
                <button className={styles.btn} type="button" onClick={handleLike}>
                  {like.isLike ? (
                    <PiHeartStraightFill size={20} />
                  ) : (
                    <PiHeartStraightLight size={20} />
                  )}
                </button>
              )}
              <span className={styles['like-count']}>{article.likeCount}</span>
              <button className={styles.btn} type="button" onClick={handleReport}>
                <AiTwotoneAlert size={20} />
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.comments}>
        <h2>댓글</h2>
        <CommentInput />
        <CommentList />
      </div>
    </>
  );
};

export default ArticleDetail;
