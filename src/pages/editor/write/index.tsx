import DefaultEditor from '@/pages/editor/components/editor';
import EditorActions from '../components/EditorActions';
import usePostArticle from '../components/editor/hooks/usePostArticle';
import useProcessContent from '../components/editor/hooks/useProcessContent';
import { useNavigate } from 'react-router-dom';
import { ArticleRequest } from '@/api/articleService';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';

const WritePage = () => {
  const { isAnonymity, processContent } = useProcessContent();
  const { user } = useAuth();
  const mutation = usePostArticle();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate('/signin');
      toast.error('로그인이 필요합니다.');
    }
  }, [navigate, user.loggedIn]);

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
