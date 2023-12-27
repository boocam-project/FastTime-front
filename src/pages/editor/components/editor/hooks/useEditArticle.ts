import ArticleService, { ArticleRequest } from '@/api/articleService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const api = new ArticleService();

const useEditArticle = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['post'],
    mutationFn: (articleData: ArticleRequest) => api.edit(articleData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['article', data.id] });
      navigate(`/community/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useEditArticle;
