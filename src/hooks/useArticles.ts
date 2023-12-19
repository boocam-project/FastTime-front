import APIClient, { Article } from '@/api/articleService';
import { ARTICLES_KEY } from '@/constants/constants';
import { InfiniteData, useSuspenseInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const apiClient = new APIClient<Article>('api/v1/post');

export const useGetArticles = ({ size }: { size: number }) => {
  return useSuspenseInfiniteQuery<
    Article[],
    AxiosError,
    InfiniteData<Article[]>,
    typeof ARTICLES_KEY,
    number
  >({
    queryKey: ARTICLES_KEY,
    queryFn: ({ pageParam }) => apiClient.getArticles({ pageParam, size }),
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
    queryFn: () => apiClient.getArticleById(id),
  });
};

export const useArticleByNickname = (nickname: string) => {
  return useQuery<Article[], AxiosError>({
    queryKey: ['article', nickname],
    queryFn: () => apiClient.getArticleByNickname(nickname),
  });
};
