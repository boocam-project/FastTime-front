import { instance } from '@/api/client';
import { MUTATION_KEYS } from '@/constants/constants';
import { Comment } from '@/data/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UpdatedComment {
  id: number;
  content: string;
}

interface NewComment {
  postId: number;
  memberId: number;
  content: string;
  anonymity: boolean;
  parentCommentId?: number;
}

const useMutations = () => {
  const { COMMENTS } = MUTATION_KEYS;
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    Comment,
    AxiosError,
    UpdatedComment,
    { previousComments: Comment[] | undefined }
  >({
    mutationKey: ['updateComment'],
    mutationFn: (updatedComment: UpdatedComment) =>
      instance.patch('api/v1/comment', updatedComment),

    onMutate: async (updatedComment: UpdatedComment) => {
      await queryClient.cancelQueries({ queryKey: COMMENTS });

      const previousComments = queryClient.getQueryData<Comment[]>(['comments']);
      queryClient.setQueryData(['comments', updatedComment.id], updatedComment);

      return { previousComments };
    },

    onError: (_err, _newComment, context) => {
      if (context) {
        queryClient.setQueryData(['comments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS });
    },
  });

  const addMutation = useMutation<
    Comment,
    AxiosError,
    NewComment,
    { previousComments: Comment[] | undefined }
  >({
    mutationKey: ['addComment'],
    mutationFn: (newComment: NewComment) => instance.post('api/v1/comment', newComment),

    onMutate: async (newComment: NewComment) => {
      await queryClient.cancelQueries({ queryKey: COMMENTS });

      const tempId = `${Date.now()}-${Math.random()}`;

      const newCommentWithTempId = {
        ...newComment,
        id: tempId,
      };

      const previousComments = queryClient.getQueryData<Comment[]>(['comments']);
      queryClient.setQueryData(['comments'], (old) => [
        ...(old as Comment[]),
        newCommentWithTempId,
      ]);

      return { previousComments };
    },

    onError: (_err, _newComment, context) => {
      if (context) {
        queryClient.setQueryData(['comments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS });
    },
  });

  return { updateMutation, addMutation };
};

export default useMutations;
