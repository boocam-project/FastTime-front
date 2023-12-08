import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? 'https://backend.boocam.net/' : 'https://api-dev.boocam.net';

export const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      alert('로그인이 필요합니다.');
      window.location.href = '/signin';
    } else if (error.response.status === 401) {
      alert('권한이 없습니다.');
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);
