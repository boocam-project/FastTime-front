import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { BsHeartFill, BsPencilSquare } from 'react-icons/bs';
import { formatTime } from './changeTimeFormat';
import ArticleSkeletons from './ArticleSkeletons';
import { useArticle } from '@/hooks/useArticles';

const ArticleList = () => {
  const skeletonItems = [1, 2, 3, 4];

  const { data, isLoading, fetchNextPage, error } = useArticle({ pageSize: 10 });
  const navigate = useNavigate();
  const observerRef = useRef(null);

  console.log(data);

  useEffect(() => {
    if (error && error.status === 403) {
      navigate('/signin');
    }
  }, [error, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.1 }
    );

    const target = observerRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, [fetchNextPage]);

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
            {data.pages.map((page) =>
              page.map((article) => (
                <article key={article.id} className={styles.article}>
                  <Link to={`${article.id}`}>
                    <div className={styles['article-contents']}>
                      <div>
                        <h2 className={styles.title}>{article.title}</h2>
                        <p className={styles.description}>{article.content}</p>
                      </div>
                    </div>
                    <div className={styles['article-info']}>
                      <span className={styles.user}>
                        {article.anonymity ? '익명' : article.nickname}
                      </span>
                      <span className={styles.date}>{formatTime(article.createdAt)}</span>
                      <span className={styles.like}>
                        <BsHeartFill /> {article.likeCount}
                      </span>
                    </div>
                  </Link>
                </article>
              ))
            )}
            {(data || !isLoading) && <div ref={observerRef} />}
          </>
        )}
      </div>
    </>
  );
};

export default ArticleList;
