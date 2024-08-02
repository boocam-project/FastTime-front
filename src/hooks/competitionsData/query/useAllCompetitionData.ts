import CompetitionsService, { type CompetitionsQuery } from '@/api/competitionsService';
import { useQuery } from '@tanstack/react-query';

const useAllCompetitionData = (query: CompetitionsQuery) => {
  const competitionsService = new CompetitionsService();

  return useQuery({
    queryKey: [
      'competitions',
      query.before,
      query.continues,
      query.after,
      query.keyword,
      query.orderBy,
      query.page,
      query.pageSize,
    ],
    queryFn: () => {
      return competitionsService.getAll(query);
    },
  });
};

export default useAllCompetitionData;
