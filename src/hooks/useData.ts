import { instance } from '@/api/client';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const useData = <T>(method: HttpMethod, endpoint: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await instance({
          method: method,
          url: endpoint,
          params: params,
          signal: controller.signal,
        });
        console.log(response);

        setData(response.data.data);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setError(error);
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint, method, params]);

  return { data, isLoading, error };
};

export default useData;
