import { instance } from './client';

export interface PostArticle {
  title: string;
  content: string;
  anonymity: boolean;
}

export interface Article {
  id: number;
  nickname: string;
  title: string;
  anonymity: boolean;
  content: string;
  likeCount: number;
  commentCounts: number;
  createdAt: string | null;
  lastModifiedAt: string | null;
}

export interface Like {
  id: number;
  isLike: boolean;
  memberId: number;
  postId: number;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
}

export interface QueryParam {
  page?: number;
  pageSize?: number;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getArticles = async ({ pageParam, size }: { pageParam: number; size: number }) => {
    const response = await instance.get<{ data: Article[] }>(this.endpoint, {
      params: {
        pageParam,
        size,
      },
    });

    if (response.status === 403) {
      const error = new Error('Forbidden');
      error.name = 'Forbidden';
      throw error;
    }

    return response.data.data;
  };

  getArticleById = async (id: number) => {
    const response = await instance.get<ApiResponse<T>>(`${this.endpoint}/${id}`);

    if (response.status === 403) {
      const error = new Error('Forbidden');
      error.name = 'Forbidden';
      throw error;
    }

    return response.data.data;
  };

  getArticleByNickname = async (nickname: string) => {
    const response = await instance.get<ApiListResponse<T>>(
      `${this.endpoint}?nickname=${nickname}&page=0&pageSize=10`
    );

    if (response.status === 403) {
      const error = new Error('Forbidden');
      error.name = 'Forbidden';
      throw error;
    }

    return response.data.data;
  };

  post = (article: PostArticle) => {
    return instance.post(this.endpoint, article).then((res) => res.data);
  };
}

export default APIClient;
