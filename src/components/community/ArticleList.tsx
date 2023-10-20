import styles from './index.module.scss';
import useData, { HttpMethod } from '@/hooks/useData';
import { Article } from './articles';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsHeartFill, BsPencilSquare } from 'react-icons/bs';
import { formatTime } from './changeTimeFormat';
import ArticleSkeletons from './articleSkeletons';

const ArticleList = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});
  const skeletonItems = [1, 2, 3, 4];

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const pageSize = params.get('pageSize') || 10;
    setQueryParams({ pageSize });
    console.log(pageSize);
  }, [location.search]);

  const { data, isLoading } = useData<Article[]>(HttpMethod.GET, 'api/v1/post', queryParams);

  return (
    <>
      <div className={styles['article-container']}>
        {isLoading || !data ? (
          skeletonItems.map((item) => <ArticleSkeletons key={item} />)
        ) : (
          <>
            <div className={styles['article-menus']}>
              <h1>게시글</h1>
              <Link to={'/write'}>
                <BsPencilSquare size={20} />
                <span>글쓰기</span>
              </Link>
            </div>
            {data?.map((article) => (
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
                    <span className={styles.date}>{formatTime(article.createdAt)}</span>
                    <span className={styles.like}>
                      <BsHeartFill /> {article.likeCount}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ArticleList;
