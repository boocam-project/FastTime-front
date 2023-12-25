import { Suspense } from 'react';
import EditEditor from './components/EditEditor';
import EditorActions from '../components/EditorActions';
import { useNavigate, useParams } from 'react-router-dom';
import useProcessContent from '../components/editor/hooks/useProcessContent';
import { ArticleRequest } from '@/api/articleService';
import useEditArticle from '../components/editor/hooks/useEditArticle';

const EditPage = () => {
  const { id } = useParams();
  const { isAnonymity, processContent } = useProcessContent();
  const mutation = useEditArticle();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { processedContent: content, processedTitle: title } = await processContent();
    const articleData: ArticleRequest = { title, content, isAnonymity, id: parseInt(id!) };
    console.log(articleData);
    mutation.mutate(articleData);
  };

  const handleCancel = () => {
    navigate(`/community/${id}`);
  };

  return (
    <>
      <Suspense>
        <EditEditor />
      </Suspense>
      <EditorActions type="수정" onSubmit={handleSubmit} onCancel={handleCancel} />
    </>
  );
};

export default EditPage;
