import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useArticleByNickname } from '@/hooks/useArticles';

interface Props {
  nickname: string;
}

const MyArticles = ({ nickname }: Props) => {
  const { data: articles, isLoading } = useArticleByNickname(nickname);

  if (isLoading) {
    // TODO: 로딩 스켈레톤 추가
    return <span>Loading...</span>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>나의 글 ({articles?.length})</h3>
      <ul className={styles.articles}>
        {articles && articles.length > 0 ? (
          articles?.map((article) => (
            <li key={article.id}>
              <Link to={`/community/${article.id}`}>
                <span className={styles['article-title']}>{article.title}</span>
              </Link>
            </li>
          ))
        ) : (
          <span>작성한 게시글이 없습니다.</span>
        )}
      </ul>
    </div>
  );
};

export default MyArticles;
