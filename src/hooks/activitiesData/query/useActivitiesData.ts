import ActivitiesService, { type ActivitiesQuery } from '@/api/activitiesService';
import { useQuery } from '@tanstack/react-query';

const useActivitiesData = (query: ActivitiesQuery) => {
  const activitiesService = new ActivitiesService();

  return useQuery({
    queryKey: [
      'activities',
      query.before,
      query.closed,
      query.during,
      query.keyword,
      query.orderBy,
      query.page,
      query.pageSize,
    ],
    queryFn: () => {
      return activitiesService.getAll(query);
    },
  });
};

export default useActivitiesData;
