import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '@/components/signIn/utils/getToken';
import axios from 'axios';
import { getNewAccessToken } from './authApi';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
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
      response: { status },
    } = error;

    if (status === 403 || status === 401) {
      const originalRequest = config;
      const { accessToken, refreshToken } = getTokenFromLocalStorage();

      if (accessToken && refreshToken) {
        const { data, code } = await getNewAccessToken(accessToken, refreshToken);
        if (code === 200) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.token;
          setTokenToLocalStorage(newAccessToken, newRefreshToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        }
      }
      // TODO: 리프레시 토큰 기한이 만료되었을 때
    }

    return Promise.reject(error);
  }
);
