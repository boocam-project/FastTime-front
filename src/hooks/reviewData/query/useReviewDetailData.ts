import ReviewService, { type ReviewDetailResponseData } from '@/api/reviewService';
import { useInfiniteQuery } from '@tanstack/react-query';

const reviewService = new ReviewService();

const useReviewDetailData = (query: { sortBy?: 'rating' | 'createdAt'; bootcamp: string }) => {
  return useInfiniteQuery<ReviewDetailResponseData, Error>({
    queryKey: ['review', query.bootcamp],
    queryFn: ({ pageParam = 1 }) => reviewService.detail({ ...query, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export default useReviewDetailData;
