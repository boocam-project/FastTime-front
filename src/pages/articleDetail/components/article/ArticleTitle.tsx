import { useArticle } from '../../hooks/useArticle';

const ArticleTitle = () => {
  const { data: article } = useArticle();

  return <h1>{article.title}</h1>;
};

export default ArticleTitle;
