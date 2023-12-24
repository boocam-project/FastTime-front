import { ENDPOINTS } from './apiConfig';
import { instance } from './client';

export type CommentResponseData = {
  totalPages: number;
  isLastPage: boolean;
  totalComments: number;
  comments: Comment[];
};

export type Comment = {
  commentId: number;
  memberId: number;
  articleId: number;
  nickname: string;
  content: string;
  anonymity: boolean;
  parentCommentId?: boolean;
  childCommentCount: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type CommentParams = {
  page: number;
  pageSize?: number;
  articleId: number;
};

class CommentService {
  private endpoint = ENDPOINTS.comments;

  getComments = async ({ page = 0, pageSize = 10, articleId }: CommentParams) => {
    const response = await instance.get<{ data: CommentResponseData }>(`${this.endpoint}`, {
      params: {
        page,
        pageSize,
        articleId,
      },
    });

    return response.data.data;
  };
}

export default CommentService;
