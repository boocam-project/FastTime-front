import { Article, ArticleList } from '@/pages/articleDetail/types';
import { instance } from './client';
import { ENDPOINTS } from './apiConfig';

export interface Like {
  id: number;
  isLike: boolean;
  memberId: number;
  postId: number;
}

export type ArticleRequest = {
  title: string;
  content: string;
  isAnonymity: boolean;
  id?: number;
};

class ArticleService {
  private endpoint = ENDPOINTS.articles;

  getArticles = async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await instance.get<{ data: ArticleList }>(this.endpoint, {
      params: {
        page,
        pageSize,
      },
    });

    return response.data.data;
  };

  getArticleById = async (id: number) => {
    const response = await instance.get<{ data: Article }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  getArticlesByNickname = async (nickname: string) => {
    const response = await instance.get<{ data: ArticleList }>(
      `${this.endpoint}?nickname=${nickname}`
    );

    return response.data.data;
  };

  post = async (article: Pick<Article, 'title' | 'content' | 'isAnonymity'>) => {
    const response = await instance.post<{ data: string }>(this.endpoint, article);

    return response.data.data;
  };

  edit = async (article: Pick<Article, 'title' | 'content' | 'isAnonymity'> & { id?: number }) => {
    const response = await instance.put<{ data: Article }>(
      `${this.endpoint}/${article.id}`,
      article
    );

    return response.data.data;
  };
}

export default new ArticleService();
