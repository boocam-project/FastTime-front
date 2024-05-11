import axios from 'axios';
import { ENDPOINTS } from './apiConfig';
interface RefreshTokenData {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenData;
}

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponseData {
  code: number;
  message: string;
  data: {
    member: {
      memberId: number;
      email: string;
      nickname: string;
      image: string;
    };
    token: {
      grantType: string;
      accessToken: string;
      accessTokenExpiresIn: number;
      refreshToken: string;
    };
  };
}

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNewAccessToken = async (accessToken: string, refreshToken: string) => {
  const response = await authInstance.post<RefreshTokenResponse>(`${ENDPOINTS.refreshToken}`, {
    accessToken,
    refreshToken,
  });
  return response.data;
};

export const userSignIn = async (data: SignInRequestBody) => {
  const response = await authInstance.post<SignInResponseData>(`${ENDPOINTS.login}`, data);

  return response.data;
};
