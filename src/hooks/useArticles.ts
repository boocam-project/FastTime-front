import APIClient, { Article, QueryParam } from '@/api/articleService';
import { ARTICLES_KEY } from '@/constants/constants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const apiClient = new APIClient<Article>('api/v1/post');

export const useArticle = (query: QueryParam) => {
  return useInfiniteQuery<Article[], AxiosError>({
    queryKey: ARTICLES_KEY,
    queryFn: ({ pageParam = 0 }) => apiClient.getAll({ ...query, page: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
  });
};

export const useArticleById = (id: number) => {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: () => apiClient.getArticleById(id),
  });
};
