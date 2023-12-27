import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Article } from '../types';
import ArticleService from '@/api/articleService';
import { useParams } from 'react-router-dom';

const api = new ArticleService();

export const useArticle = () => {
  const { id } = useParams();

  return useSuspenseQuery<Article, AxiosError>({
    queryKey: ['article', id],
    queryFn: () => api.getArticleById(parseInt(id!)),
    staleTime: 1000 * 10,
  });
};
