import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from '@/components/signIn/utils/getToken';
import axios, { AxiosError } from 'axios';
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

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
      if (!isRefreshing) {
        isRefreshing = true;
        const { accessToken, refreshToken } = getTokenFromLocalStorage();

        if (!accessToken || !refreshToken) return;

        try {
          const { data } = await getNewAccessToken(accessToken, refreshToken);

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.token;
          setTokenToLocalStorage(newAccessToken, newRefreshToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return axios(originalRequest);
        } catch (refreshError) {
          if (refreshError instanceof AxiosError) {
            processQueue(refreshError, null);
            toast.error('접근 권한이 없습니다.');
          }
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            originalRequest.headers.authorization = `Bearer ${
              getTokenFromLocalStorage().accessToken
            }`;
            resolve(axios(originalRequest));
          },
          reject: () => {
            reject(error);
          },
        });
      });
    }
    return Promise.reject(error);
  }
);
