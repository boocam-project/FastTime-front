import CommentService, { type CommentResponseData } from '@/api/commentService';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

const api = new CommentService();

const useComments = () => {
  const { id } = useParams();

  if (!id) throw Error('잘못된 경로입니다.');

  return useInfiniteQuery<
    CommentResponseData,
    AxiosError,
    InfiniteData<CommentResponseData>,
    Array<string | number>,
    number
  >({
    queryKey: ['comments', id],
    queryFn: ({ pageParam }) => api.getComments({ page: pageParam, articleId: parseInt(id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLastPage) return undefined;
      return allPages.length;
    },
  });
};

export default useComments;
