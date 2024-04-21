import ActivitiesService from '@/api/activitiesService';
import { useQuery } from '@tanstack/react-query';

const useActivitiyData = (id: number) => {
  const activitiesService = new ActivitiesService();

  return useQuery({
    queryKey: ['activitiy', id],
    queryFn: () => {
      return activitiesService.getOne(id);
    },
  });
};

export default useActivitiyData;
