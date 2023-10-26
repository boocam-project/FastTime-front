import { instance } from '@/api/client';
import { LIKE_KEY } from '@/constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeProps {
  postId: number;
  isLike: boolean;
  memberId: number;
  id: number;
}

interface LikeResponse {
  code: number;
  message: string;
  data: LikeProps;
}

const useLikeMutations = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.post<LikeResponse>('api/v1/record/', {
        postId: id,
        isLike: true,
      });

      return response.data;
    },

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['like', postId] });
      const previousLike = queryClient.getQueryData<LikeResponse>(['like', postId]);

      queryClient.setQueryData(['like', postId], (old: LikeProps) => ({
        ...old,
        isLike: true,
      }));

      return { previousLike };
    },

    onError: (_err, _newLike, context) => {
      if (context) {
        queryClient.setQueryData(['like', context.previousLike], context.previousLike);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LIKE_KEY });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.delete<LikeResponse>('api/v1/record/', {
        data: { postId: id },
      });

      return response.data;
    },

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['like', postId] });
      const previousLike = queryClient.getQueryData<LikeResponse>(['like', postId]);

      queryClient.setQueryData(['like', postId], (old: LikeProps) => ({
        ...old,
        isLike: false,
      }));

      return { previousLike };
    },

    onError: (_err, _newLike, context) => {
      if (context) {
        queryClient.setQueryData(['like', context.previousLike], context.previousLike);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LIKE_KEY });
    },
  });

  return { likeMutation, unlikeMutation };
};

export default useLikeMutations;
