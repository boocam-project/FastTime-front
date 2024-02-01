import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '@/components/signIn/utils/getToken';
import axios from 'axios';
import { getNewAccessToken } from './authApi';
import toast from 'react-hot-toast';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (config.headers && accessToken && refreshToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  return config;
});

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    if (status === 403 || status === 401) {
      const originalRequest = config;
      const { accessToken, refreshToken } = getTokenFromLocalStorage();

      if (accessToken && refreshToken) {
        try {
          const { data, code } = await getNewAccessToken(accessToken, refreshToken);
          if (code === 200) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.token;
            setTokenToLocalStorage(newAccessToken, newRefreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

            return axios(originalRequest);
          }
        } catch (error) {
          // TODO: 토스트 한 번만 뜨게하기, 리다이렉트 효과적으로 처리할 방법
          toast.error('접근 권한이 없습니다.');
        }
      }
      // 리프레시 토큰이 없거나 만료되었을 때
      if (data.path.startsWith('/api/v2/articles')) {
        toast.error('접근 권한이 없습니다.');
        return Promise.reject(error);
      }
      toast.error('다시 로그인 해주세요.');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
