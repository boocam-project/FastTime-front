import { useQuery } from '@tanstack/react-query';
import ReviewService from '@/api/reviewService';

const useSummaryData = (query: { page?: number; size?: number }) => {
  const reviewService = new ReviewService();
  return useQuery({
    queryKey: ['review', 'summary', query.page, query.size],
    queryFn: () => {
      return reviewService.summary(query);
    },
  });
};

export default useSummaryData;
