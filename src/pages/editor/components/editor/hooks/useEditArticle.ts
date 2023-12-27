import ArticleService, { ArticleRequest } from '@/api/articleService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const api = new ArticleService();

const useEditArticle = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['post'],
    mutationFn: (articleData: ArticleRequest) => api.edit(articleData),
    onSuccess: (data) => {
      navigate(`/community/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useEditArticle;
