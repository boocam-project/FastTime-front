import type { ReviewPostData, ReviewRequest } from '@/api/reviewService';
import ReviewService from '@/api/reviewService';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const reviewService = new ReviewService();

const usePostReview = () => {
  const navigate = useNavigate();
  return useMutation<ReviewPostData, Error, ReviewRequest>({
    mutationFn: (newReview) => reviewService.post(newReview),
    onSuccess: (data) => {
      console.log(data);
      navigate('review');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export default usePostReview;
