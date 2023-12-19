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

class APIService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getArticles = async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await instance.get<{ data: T[] }>(this.endpoint, {
      params: {
        page,
        pageSize,
      },
    });

    return response.data.data;
  };

  getArticleById = async (id: number) => {
    const response = await instance.get<{ data: T }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  getArticlesByNickname = async (nickname: string) => {
    const response = await instance.get<{ data: T[] }>(`${this.endpoint}?nickname=${nickname}`);

    return response.data.data;
  };

  post = (article: PostArticle) => {
    return instance.post(this.endpoint, article).then((res) => res.data);
  };
}

export default APIService;
