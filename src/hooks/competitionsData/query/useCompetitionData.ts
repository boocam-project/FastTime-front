import CompetitionsService from '@/api/competitionsService';
import { useQuery } from '@tanstack/react-query';

const useCompetitionData = (id: number) => {
  const competitionsService = new CompetitionsService();

  return useQuery({
    queryKey: ['competition', id],
    queryFn: () => {
      return competitionsService.getOne(id);
    },
  });
};

export default useCompetitionData;
