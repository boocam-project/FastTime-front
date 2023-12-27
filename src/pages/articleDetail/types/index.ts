export type Article = {
  id: number;
  title: string;
  content: string;
  nickname: string;
  isAnonymity: boolean;
  likeCount: number;
  hateCount: number;
  createdAt: string;
  lastModifiedAt: string;
};

export type ArticleList = (Omit<Article, 'content'> & { commentCounts: number })[];
