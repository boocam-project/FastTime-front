import ArticleService from '@/api/articleService';
import { ARTICLES_KEY } from '@/constants/constants';
import { Article, ArticleList } from '@/pages/articleDetail/types';
import { InfiniteData, useSuspenseInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const api = new ArticleService();

export const useGetArticles = ({ pageSize }: { pageSize: number }) => {
  return useSuspenseInfiniteQuery<
    ArticleList,
    AxiosError,
    InfiniteData<ArticleList>,
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
  return useQuery<ArticleList, AxiosError>({
    queryKey: ['article', nickname],
    queryFn: () => api.getArticlesByNickname(nickname),
  });
};
