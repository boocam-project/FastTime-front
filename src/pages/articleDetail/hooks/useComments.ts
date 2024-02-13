import CommentService from '@/api/commentService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const api = new CommentService();

const useParentComments = () => {
  const { id } = useParams();

  return useInfiniteQuery({
    queryKey: ['comments', id],
    queryFn: ({ pageParam }) => api.getComments({ page: pageParam, articleId: parseInt(id!) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLastPage) return undefined;
      return allPages.length;
    },
  });
};

const useChildComments = (parentCommentId: number) => {
  const { id } = useParams();

  return useInfiniteQuery({
    queryKey: ['comments', id, parentCommentId],
    queryFn: ({ pageParam }) => api.getComments({ page: pageParam, parentCommentId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLastPage) return undefined;
      return allPages.length;
    },
  });
};

export { useParentComments, useChildComments };
