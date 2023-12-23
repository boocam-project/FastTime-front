import parser from 'html-react-parser';
import { useArticle } from '../hooks/useArticle';

const ArticleMain = () => {
  const { data: article } = useArticle();

  const content = parser(article?.content || '');

  return <div>{content}</div>;
};

export default ArticleMain;
