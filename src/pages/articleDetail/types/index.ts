export type Article = {
  id: number;
  title: string;
  content: string;
  nickname: string;
  isAnonymity: boolean;
  likeCount: number;
  hateCount: number;
  createdAt: string | null;
  lastModifiedAt: string | null;
};

export type ArticleList = (Omit<Article, 'content'> & { commentCounts: number })[];
