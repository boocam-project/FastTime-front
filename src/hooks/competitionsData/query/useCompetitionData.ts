import CompetitionsService from '@/api/competitionsService';
import { useQuery } from '@tanstack/react-query';

const useCompetitionData = ({ id, start }: { id: number; start: boolean }) => {
  const competitionsService = new CompetitionsService();

  return useQuery({
    queryKey: ['competition', id],
    queryFn: () => {
      return competitionsService.getOne(id);
    },
    enabled: start,
  });
};

export default useCompetitionData;
