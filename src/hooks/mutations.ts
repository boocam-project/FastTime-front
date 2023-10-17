import { instance } from '@/api/client';
import { Comment } from '@/data/comment';
import { useQueryClient, useMutation } from 'react-query';

interface NewComment {
  postId: number;
  memberId: number;
  content: string;
  anonymity: boolean;
  parentCommentId?: number;
}

const addComment = async (newComment: NewComment) => {
  const response = await instance.post('api/v1/comment', newComment);
  console.log(response.data);

  return response.data.data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation('addComment', {
    mutationFn: addComment,
    onMutate: async (newComment: NewComment) => {
      await queryClient.cancelQueries('comments');

      const previousComments = queryClient.getQueryData<Comment[]>('comments');

      if (previousComments) {
        queryClient.setQueryData('comments', (old) => {
          return [...(old as Comment[]), newComment];
        });
      }

      return { previousComments };
    },
    onError: (_err, _newComment, context) => {
      queryClient.setQueryData('comments', context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  return addMutation;
};
