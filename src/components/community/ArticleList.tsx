import styles from './article.module.scss';
import useData, { HttpMethod } from '@/hooks/useData';
import { Article } from './articles';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';

const ArticleList = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const pageSize = params.get('pageSize') || 10;
    setQueryParams({ pageSize });
    console.log(pageSize);
  }, [location.search]);

  const { data, isLoading } = useData<Article[]>(HttpMethod.GET, 'api/v1/post', queryParams);

  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        data?.map((article) => (
          <article key={article.id} className={styles.article}>
            <Link to={`${article.id}`}>
              <div className={styles['article-contents']}>
                <div>
                  <h2 className={styles.title}>{article.title}</h2>
                  <p className={styles.description}>{article.content}</p>
                </div>
                <div>
                  <img
                    src={`https://picsum.photos/seed/${article.id}/600/300`}
                    alt=""
                    width={112}
                    height={112}
                  />
                </div>
              </div>
              <div className={styles['article-info']}>
                <span className={styles.user}>{article.nickname}</span>
                <span className={styles.date}>{article.createdAt}</span>
                <span className={styles.like}>
                  <BsHeartFill /> {article.likeCount}
                </span>
              </div>
            </Link>
          </article>
        ))
      )}
    </>
  );
};

export default ArticleList;
