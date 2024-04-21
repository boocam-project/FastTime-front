import { useQuery } from '@tanstack/react-query';
import activitiesService from '@/api/activitiesService';
import { type ActivitiesQuery } from '@/api/activitiesService';

const useActivitiesData = (query: ActivitiesQuery) => {
  const reviewService = new activitiesService();

  return useQuery({
    queryKey: ['activities'],
    queryFn: () => {
      return reviewService.getAll(query);
    },
  });
};

export default useActivitiesData;
