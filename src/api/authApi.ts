import { instance } from './client';
type RefreshTokenData = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

type RefreshTokenResponse = {
  code: number;
  data: RefreshTokenData;
};

export const getNewAccessToken = async (accessToken: string, refreshToken: string) => {
  const response = await instance.post<RefreshTokenResponse>(
    '/api/v2/refresh',
    { accessToken, refreshToken },
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    }
  );
  return response.data;
};
