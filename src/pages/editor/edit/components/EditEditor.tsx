import DefaultEditor from '@/pages/editor/components/editor';
import { useArticle } from '../../../articleDetail/hooks/useArticle';

const EditEditor = () => {
  const { data: article, isLoading } = useArticle();

  if (isLoading) return null;

  return <DefaultEditor article={article} />;
};

export default EditEditor;
