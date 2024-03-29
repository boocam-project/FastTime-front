import { useArticles } from '@/pages/articleList/hooks/useArticles';
import styles from './ArticleList.module.scss';
import { formatTime } from '@/pages/articleDetail/utils';

import { AiOutlineComment } from 'react-icons/ai';
import { ReactComponent as HeartFill } from '@/assets/icons/heart_filled.svg';

import { Link } from 'react-router-dom';
import { PAGE_SIZE } from '../constants';
import useIntersect from '../hooks/useIntersect';

const ArticleList = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useArticles({ pageSize: PAGE_SIZE });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const articles = data.pages.flatMap((page) => page);

  return (
    <>
      {articles.map((article) => (
        <article key={article.id} className={styles.article}>
          <Link to={`${article.id}`}>
            <div className={styles.articleContents}>
              <div>
                <h2 className={styles.title}>{article.title}</h2>
                {/* <p className={styles.description}>{article.content}</p> */}
              </div>
            </div>
            <div className={styles.articleInfo}>
              <span className={styles.user}>{article.isAnonymity ? '익명' : article.nickname}</span>
              <span className={styles.date}>{formatTime(article.createdAt)}</span>
              <span className={styles.like}>
                <HeartFill /> {article.likeCount}
              </span>
              <span>
                <AiOutlineComment size={18} /> {article.commentCounts}
              </span>
            </div>
          </Link>
        </article>
      ))}
      <div className={styles.observer} ref={ref} />
    </>
  );
};

export default ArticleList;
