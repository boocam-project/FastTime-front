import ActivitiesService from '@/api/activitiesService';
import { useQuery } from '@tanstack/react-query';

const useActivitiyData = ({ id, start }: { id: number; start: boolean }) => {
  const activitiesService = new ActivitiesService();

  return useQuery({
    queryKey: ['activitiy', id],
    queryFn: () => {
      return activitiesService.getOne(id);
    },
    enabled: start,
  });
};

export default useActivitiyData;
