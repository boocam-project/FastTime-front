import DefaultEditor from '@/pages/editor/components/editor';
import EditorActions from '../components/EditorActions';
import usePostArticle from '../components/editor/hooks/usePostArticle';
import useProcessContent from '../components/editor/hooks/useProcessContent';
import { useNavigate } from 'react-router-dom';
import { ArticleRequest } from '@/api/articleService';

const WritePage = () => {
  const { isAnonymity, processContent } = useProcessContent();
  const mutation = usePostArticle();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { processedContent: content, processedTitle: title } = await processContent();
    const articleData: ArticleRequest = { content, title, isAnonymity };
    mutation.mutate(articleData);
  };

  const handleCancel = () => {
    navigate('/community');
  };

  return (
    <>
      <DefaultEditor />
      <EditorActions type="발행" onSubmit={handleSubmit} onCancel={handleCancel} />
    </>
  );
};

export default WritePage;
