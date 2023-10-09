import { Article } from './articles';
import styles from './article.module.scss';
import { BsHeartFill } from 'react-icons/bs';

interface Props {
  article: Article;
}

const ArticleItem = ({ article }: Props) => {
  return (
    <article className={styles.article}>
      <div className={styles['article-contents']}>
        <div>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.description}>{article.description}</p>
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
        <span className={styles.user}>{article.user}</span>
        <span className={styles.date}>{article.createdAt}</span>
        <span className={styles.like}>
          <BsHeartFill /> {article.likes}
        </span>
      </div>
    </article>
  );
};

export default ArticleItem;
