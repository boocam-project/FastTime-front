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
