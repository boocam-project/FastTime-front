import { useParams } from 'react-router-dom';
import { articles } from './articles';

import styles from './article.module.scss';
import { BsHeartFill } from 'react-icons/bs';
import Comment from '../comment/Comment';

const ArticleDetail = () => {
  // 글 리스트에서 어차피 글 정보 다 받아오는데
  // 굳이 여기서 한 번 더 요청할 필요는?
  const { id: idString } = useParams();
  const id = Number(idString);
  const selectedArticle = articles.find((article) => article.id === id);

  console.log(id);

  return (
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
      <Comment />
    </>
  );
};

export default ArticleDetail;
