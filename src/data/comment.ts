export interface Comment {
  id: number;
  nickname?: string;
  postId: number;
  memberId: number;
  content: string;
  anonymity: boolean;
  parentCommentId?: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  children?: Comment[];
}

export const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 1',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 2,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 2',
    anonymity: false,
    parentCommentId: 5,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 3,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 3',
    anonymity: false,
    parentCommentId: 1,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 4,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 4',
    anonymity: false,
    parentCommentId: 1,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 5,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 5',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 6,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 6',
    anonymity: false,
    parentCommentId: 5,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 7,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 7',
    anonymity: false,
    parentCommentId: 5,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 8,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 8',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 9,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 9',
    anonymity: false,
    parentCommentId: 8,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 10,
    postId: 1,
    memberId: 1,
    content: '댓글 내용 10',
    anonymity: false,
    parentCommentId: 8,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 13,
    postId: 2,
    memberId: 1,
    content: '댓글 내용 11',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 11,
    postId: 2,
    memberId: 1,
    content: '댓글 내용 12',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
  {
    id: 12,
    postId: 2,
    memberId: 1,
    content: '댓글 내용 13',
    anonymity: false,
    createdAt: '2023-01-01 12:00:00',
  },
];
