import DefaultEditor from '@/pages/editor/components/editor';
import { useGetArticleById } from '../../../articleDetail/hooks/useGetArticle';

const EditEditor = () => {
  const { data: article, isLoading } = useGetArticleById();

  if (isLoading) return null;

  return <DefaultEditor article={article} />;
};

export default EditEditor;
