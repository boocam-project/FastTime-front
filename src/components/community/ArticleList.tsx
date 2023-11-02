import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { BsHeartFill, BsPencilSquare } from 'react-icons/bs';
import { formatTime } from './changeTimeFormat';
import ArticleSkeletons from './ArticleSkeletons';
import { useArticle } from '@/hooks/useArticles';
import { AiOutlineComment } from 'react-icons/ai';

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
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 }
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
  }, [fetchNextPage, data]);

  return (
    <>
      <div className={styles['article-container']}>
        {isLoading || !data ? (
          skeletonItems.map((item) => <ArticleSkeletons key={item} />)
        ) : (
          <>
            <div className={styles['article-menus']}>
              <h2 style={{ fontWeight: 'normal' }}>게시글</h2>
              <Link to={'/write'}>
                <BsPencilSquare size={20} />
                <span>글쓰기</span>
              </Link>
            </div>
            {data.pages.map((page, pageIndex) =>
              page.map((article, articleIndex) => (
                <article
                  key={`${article.id}-${pageIndex}-${articleIndex}`}
                  className={styles.article}
                >
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
                        <BsHeartFill size={14} /> {article.likeCount}
                      </span>
                      <span>
                        <AiOutlineComment size={18} /> {article.commentCounts}
                      </span>
                    </div>
                  </Link>
                </article>
              ))
            )}
            <div ref={observerRef}></div>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleList;
