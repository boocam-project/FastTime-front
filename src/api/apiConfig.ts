export const API_VERSION = '/api/v2';

export const ENDPOINTS = {
  articles: `${API_VERSION}/articles`,
  login: `${API_VERSION}/login`,
  refresh: `${API_VERSION}/refresh`,
};

export const ENDPOINTS_V1 = {
  comments: `api/v1/comments`,
  changePassword: `api/v1/RePassword`,
  modifyUser: `api/v1/retouch-member`,
  registerUser: `api/v1/join`,
  deleteUser: `api/v1/delete`,
  myPage: `api/v1/mypages`,
  registerAdmin: `api/v1/admin/join`,
  reportedArticles: `api/v1/admin`,
};
