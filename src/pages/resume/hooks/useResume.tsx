import { useQuery } from '@tanstack/react-query';
import api from '@/api/resumeService';

const useResume = () => {
  return useQuery({
    queryKey: ['resume'],
    queryFn: () => api.getResume(),
  });
};

export default useResume;
