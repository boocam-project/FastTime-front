import { useQuery } from '@tanstack/react-query';
import studyService from '@/api/studyService';

export const useGetStudy = (id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['study', id],
    queryFn: () => studyService.getStudy(id),
  });

  return { isLoading, data, error };
};
