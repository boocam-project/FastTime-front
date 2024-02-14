import api, { ArticleRequest } from '@/api/articleService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostArticle = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['post'],
    mutationFn: (articleData: ArticleRequest) => api.post(articleData),
    onSuccess: (data) => {
      const articleId = data.split('/')[data.split('/').length - 1];
      navigate(`/community/${articleId}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePostArticle;
