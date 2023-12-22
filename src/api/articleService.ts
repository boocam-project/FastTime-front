import { Article, ArticleList } from '@/pages/articleDetail/types';
import { instance } from './client';
import { ENDPOINTS } from './apiConfig';

export interface Like {
  id: number;
  isLike: boolean;
  memberId: number;
  postId: number;
}

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
    return await instance.post(this.endpoint, article);
  };
}

export default ArticleService;
