import { instance } from '@/api/client';
import { COMMENTS_KEY } from '@/constants/constants';
import { Comment } from '@/data/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UpdatedComment {
  id: number;
  content: string;
}

interface NewComment {
  postId: number;
  content: string;
  anonymity: boolean;
  parentCommentId?: number;
}

const useCommentMutations = () => {
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
      await queryClient.cancelQueries({ queryKey: COMMENTS_KEY });

      const previousComments = queryClient.getQueryData<Comment[]>(COMMENTS_KEY);
      queryClient.setQueryData(['comments', updatedComment.id], updatedComment);

      return { previousComments };
    },

    onError: (_err, _newComment, context) => {
      if (context) {
        queryClient.setQueryData(COMMENTS_KEY, context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_KEY });
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
      await queryClient.cancelQueries({ queryKey: COMMENTS_KEY });

      const tempId = `${Date.now()}-${Math.random()}`;

      const newCommentWithTempId = {
        ...newComment,
        id: tempId,
      };

      const previousComments = queryClient.getQueryData<Comment[]>(COMMENTS_KEY);
      queryClient.setQueryData(['comments'], (old) => [
        ...(old as Comment[]),
        newCommentWithTempId,
      ]);

      return { previousComments };
    },

    onError: (_err, _newComment, context) => {
      if (context) {
        queryClient.setQueryData(COMMENTS_KEY, context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_KEY });
    },
  });

  const deleteMutation = useMutation<
    Comment,
    AxiosError,
    { id: number },
    { previousComments: Comment[] | undefined }
  >({
    mutationKey: ['deleteComment'],
    mutationFn: ({ id }: { id: number }) => instance.delete(`api/v1/comment`, { data: { id } }),

    onMutate: async ({ id }: { id: number }) => {
      await queryClient.cancelQueries({ queryKey: COMMENTS_KEY });

      const previousComments = queryClient.getQueryData<Comment[]>(COMMENTS_KEY);
      queryClient.setQueryData(COMMENTS_KEY, (old) => [
        ...(old as Comment[]).filter((comment) => comment.id !== id),
      ]);

      return { previousComments };
    },

    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData(COMMENTS_KEY, context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_KEY });
    },
  });

  return { updateMutation, addMutation, deleteMutation };
};

export default useCommentMutations;
