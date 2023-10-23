import { instance } from '@/api/client';
import { QUERY_KEYS } from '@/constants/constants';
import { useQuery } from '@tanstack/react-query';

export const useGetArticle = () => {
  const fetchArticles = async () => {
    const response = await instance.get('api/v1/post');
    return response.data.data;
  };

  return useQuery({
    queryKey: QUERY_KEYS.ARTICLES,
    queryFn: fetchArticles,
  });
};

export const useGetArticleById = (id: number) => {
  const fetchArticle = async () => {
    const response = await instance.get(`api/v1/post/${id}`);
    return response.data.data;
  };

  return useQuery({
    queryKey: ['article', id],
    queryFn: fetchArticle,
  });
};
