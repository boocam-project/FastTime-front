export const API_VERSION = '/api/v2';

export const ENDPOINTS = {
  articles: `${API_VERSION}/articles`,
  login: import.meta.env.DEV ? `${API_VERSION}/login` : `/api/v1/login`,
  refreshToken: `${API_VERSION}/refresh`,
  members: `/api/v1/members`,
  comments: `/api/v1/comments`,
  admin: `/api/v1/admin`,
  report: `/api/v1/report`,
  like: `/api/v1/article-like`,
  reviews: `${API_VERSION}/reviews`,
  resume: `${API_VERSION}/resume`,
};
