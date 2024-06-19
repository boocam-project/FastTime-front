import { instance } from './client';
import { ENDPOINTS } from './apiConfig';

export interface ReviewPostData {
  id: number;
  bootcamp: string;
  title: string;
  goodtags: string[];
  badtags: string[];
  rating: number;
  content: string;
}

export interface ReviewPostResponse {
  code: number;
  message: string;
  data: ReviewPostData | null;
}

export type ReviewRequest = {
  title: string;
  goodtags: number[];
  badtags: number[];
  rating: number;
  content: string;
};

export interface SummaryResponse {
  code: number;
  message: string;
  data: Summary[];
}

export interface Summary {
  bootcamp: string;
  averageRating: number;
  totalReviews: number;
}

class ReviewService {
  private endpoint = ENDPOINTS.reviews;

  post = async (review: ReviewRequest) => {
    const response = await instance.post<{ data: ReviewPostResponse }>(this.endpoint, review);

    return response.data.data;
  };

  delete = async (id: number) => {
    const response = await instance.post<{ data: ReviewPostResponse }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  edit = async (review: ReviewRequest, id: number) => {
    const response = await instance.put<{ data: ReviewPostResponse }>(
      `${this.endpoint}/${id}`,
      review
    );

    return response.data.data;
  };

  summary = async () => {
    const response = await instance.put<{ data: SummaryResponse }>(`${this.endpoint}/summary`);

    return response.data.data;
  };
}

export default ReviewService;
