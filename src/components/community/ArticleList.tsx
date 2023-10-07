import ArticleItem from './ArticleItem';
import { articles } from './articles';

const ArticleList = () => {
  const articlesList = articles;

  return articlesList.map((article) => <ArticleItem key={article.id} article={article} />);
};

export default ArticleList;
