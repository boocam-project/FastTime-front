import { useParams } from 'react-router-dom';

import styles from './article.module.scss';
import { BsHeartFill } from 'react-icons/bs';
import useData, { HttpMethod } from '@/hooks/useData';
import { Article } from './articles';
import CommentInput from '../comment/CommentInput';
import CommentList from '../comment/CommentList';
import { instance } from '@/api/client';
import parser from 'html-react-parser';

const ArticleDetail = () => {
  const { id: idString } = useParams();
  const id = Number(idString);

  const { data: article, isLoading } = useData<Article>(HttpMethod.GET, `api/v1/post/${id}`);

  const content = parser(article?.content || '');

  const handleDelete = async () => {
    console.log(id);

    const response = await instance.delete(`api/v1/post`, {
      data: {
        postId: id,
        memberId: 1,
      },
    });
    console.log(response.data);
  };

  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <div className={styles['article-details']}>
            <h1>{article?.title}</h1>
            <div className={styles.info}>
              <div>
                <span>{article?.nickname}</span>
                <span>{article?.createdAt}</span>
                <span>
                  <BsHeartFill /> {article?.likeCount}
                </span>
              </div>
              <div>
                <button className={styles.btns} type="button">
                  수정
                </button>
                <button className={styles.btns} type="button" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
            <div>{content}</div>
          </div>
          <CommentInput />
          <CommentList />
        </>
      )}
    </>
  );
};

export default ArticleDetail;
