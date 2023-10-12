import { useParams } from 'react-router-dom';
import { Article, articles } from './articles';

import styles from './article.module.scss';
import { BsHeartFill } from 'react-icons/bs';
import Comment from '../comment/Comment';
import { useEffect, useState } from 'react';
import { instance } from '@/api/client';

const ArticleDetail = () => {
  // 글 리스트에서 어차피 글 정보 다 받아오는데
  // 굳이 여기서 한 번 더 요청할 필요는?
  const { id: idString } = useParams();
  // const [article, setArticle] = useState<HTML | null>(null);
  const [isLoading, setLoading] = useState(false);

  const id = Number(idString);
  const selectedArticle = articles.find((article) => article.id === id);

  console.log(id);

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      const response = await instance.get(`api/v1/post/${id}`);
      console.log(response.data);
      console.log(response.data.data.content);

      // convert stringify JSON to JavaScript object
      const parsedContent = JSON.parse(response.data.data.content);

      setLoading(false);
    };
    fetchPostDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <div className={styles['article-details']}>
            <h1>{selectedArticle?.title}</h1>
            <div className={styles.info}>
              <span>{selectedArticle?.user}</span>
              <span>{selectedArticle?.createdAt}</span>
              <span>
                <BsHeartFill /> {selectedArticle?.likes}
              </span>
            </div>
            <p>{selectedArticle?.description}</p>
          </div>
          <Comment postId={id} />
        </>
      )}
    </>
  );
};

export default ArticleDetail;
