import { useQuery } from '@tanstack/react-query';
import ReviewService from '@/api/reviewService';

const useSummaryData = () => {
  const reviewService = new ReviewService();
  return useQuery({
    queryKey: ['review', 'summary'],
    queryFn: reviewService.summary,
  });
};

export default useSummaryData;
