import { ARTICLES_KEY } from '@/constants/constants';
import { ArticleList } from '@/pages/articleDetail/types';
import { useSuspenseInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '@/api/articleService';

export const useArticles = ({ pageSize }: { pageSize: number }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ARTICLES_KEY,
    queryFn: ({ pageParam }) => api.getArticles({ page: pageParam, pageSize }),
    staleTime: 1000 * 60,
    refetchOnMount: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
  });
};

export const useArticleByNickname = (nickname: string) => {
  return useQuery<ArticleList, AxiosError>({
    queryKey: ['article', nickname],
    queryFn: () => api.getArticlesByNickname(nickname),
  });
};
