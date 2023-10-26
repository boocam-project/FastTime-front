import { instance } from '@/api/client';
import { QUERY_KEYS } from '@/constants/constants';
import { Comment } from '@/data/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { COMMENTS } = QUERY_KEYS;
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

    onError: (err, _newComment, context) => {
      console.log(err.response?.data);

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

    onError: (err, _newComment, context) => {
      console.log(err.response);
      if (err.response?.status === 403) {
        alert('로그인이 필요합니다.');
        navigate('/signin');
      }

      if (context) {
        queryClient.setQueryData(['comments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS });
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
      await queryClient.cancelQueries({ queryKey: COMMENTS });

      const previousComments = queryClient.getQueryData<Comment[]>(['comments']);
      queryClient.setQueryData(['comments'], (old) => [
        ...(old as Comment[]).filter((comment) => comment.id !== id),
      ]);

      return { previousComments };
    },

    onError: (_err, _variables, context) => {
      if (context) {
        queryClient.setQueryData(['comments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENTS });
    },
  });

  return { updateMutation, addMutation, deleteMutation };
};

export default useCommentMutations;
