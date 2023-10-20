import { useNavigate, useParams } from 'react-router-dom';

import styles from './details.module.scss';

import { BsHeartFill } from 'react-icons/bs';
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
import ArticleSkeletons from './articleSkeletons';

const ArticleDetail = () => {
  const { id: idString } = useParams();
  const user = useRecoilState(userState);
  const navigate = useNavigate();

  const postId = Number(idString);
  const { data: article, isLoading } = useData<Article>(HttpMethod.GET, `api/v1/post/${postId}`);

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
      const response = await instance.post('api/v1/report/create', {
        memberId: user[0].id,
        postId: postId,
      });
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
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
                <span>{article.nickname}</span>
                <span>{formatTime(article.createdAt)}</span>
                <span>
                  <BsHeartFill /> {article.likeCount}
                </span>
              </div>
              <div className={styles.btns}>
                <button className={styles.btn} type="button" onClick={handleReport}>
                  <AiTwotoneAlert size={20} />
                </button>
                {isValidUser && (
                  <button className={styles.btn} type="button" onClick={handleEdit}>
                    수정
                  </button>
                )}
                <button className={styles.btn} type="button" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
            <div>{content}</div>
            {/* 신고, 좋아요 버튼 위치 */}
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
