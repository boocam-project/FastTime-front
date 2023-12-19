import { ENDPOINTS } from '@/api/apiConfig';
import APIService, { Article } from '@/api/articleService';
import { ARTICLES_KEY } from '@/constants/constants';
import { InfiniteData, useSuspenseInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const api = new APIService<Article>(ENDPOINTS.articles);

export const useGetArticles = ({ pageSize }: { pageSize: number }) => {
  return useSuspenseInfiniteQuery<
    Article[],
    AxiosError,
    InfiniteData<Article[]>,
    typeof ARTICLES_KEY,
    number
  >({
    queryKey: ARTICLES_KEY,
    queryFn: ({ pageParam }) => api.getArticles({ page: pageParam, pageSize }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
  });
};

export const useGetArticleById = (id: number) => {
  return useQuery<Article, AxiosError>({
    queryKey: ['article', id],
    queryFn: () => api.getArticleById(id),
  });
};

export const useArticleByNickname = (nickname: string) => {
  return useQuery<Article[], AxiosError>({
    queryKey: ['article', nickname],
    queryFn: () => api.getArticlesByNickname(nickname),
  });
};
