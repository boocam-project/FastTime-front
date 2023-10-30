import type { Article, Like } from '@/api/articleService';
import { instance } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLikeMutations = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.post('api/v1/record/', {
        postId: id,
        isLike: true,
      });

      return response.data;
    },

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['article', postId] });
      await queryClient.cancelQueries({ queryKey: ['like', postId] });

      const previousPost = queryClient.getQueryData<Article>(['article', postId]);
      const previousLikeStatus = queryClient.getQueryData<Like>(['like', postId]);

      queryClient.setQueryData(['article', postId], (old: Article | undefined) => ({
        ...old,
        likeCount: old?.likeCount ? old.likeCount + 1 : 1,
      }));
      queryClient.setQueryData(['like', postId], { isLike: true });

      return { previousPost, previousLikeStatus };
    },

    onError: (_err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['article', postId], context.previousPost);
      }
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(['like', postId], context.previousLikeStatus);
      }
    },

    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['article', postId] });
      queryClient.invalidateQueries({ queryKey: ['like', postId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.delete('api/v1/record/', {
        data: { postId: id },
      });

      return response.data;
    },

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['article', postId] });
      await queryClient.cancelQueries({ queryKey: ['like', postId] });

      const previousPost = queryClient.getQueryData(['article', postId]);
      const previousLikeStatus = queryClient.getQueryData(['like', postId]);

      queryClient.setQueryData(['article', postId], (old: Article | undefined) => ({
        ...old,
        likeCount: old?.likeCount ? old.likeCount - 1 : 0,
      }));
      queryClient.setQueryData(['like', postId], { isLike: false });

      return { previousPost, previousLikeStatus };
    },

    onError: (_err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['article', postId], context.previousPost);
      }
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(['like', postId], context.previousLikeStatus);
      }
    },

    onSettled: (_data, _error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['article', postId] });
      queryClient.invalidateQueries({ queryKey: ['like', postId] });
    },
  });

  return { likeMutation, unlikeMutation };
};

export default useLikeMutations;
