import { useQuery } from '@tanstack/react-query';
import activitiesService from '@/api/activitiesService';

const useActivitiyData = (id: number) => {
  const reviewService = new activitiesService();

  return useQuery({
    queryKey: ['activitiy'],
    queryFn: () => {
      return reviewService.getOne(id);
    },
  });
};

export default useActivitiyData;
