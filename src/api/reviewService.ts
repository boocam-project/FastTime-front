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

export interface ReviewEditData extends ReviewPostData {
  authorNickname: string;
}

export interface ReviewPostResponse {
  code: number;
  message: string;
  data: ReviewPostData;
}
export interface ReviewEditResponse {
  code: number;
  message: string;
  data: ReviewEditData | null;
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
  data: SummaryData;
}

interface SummaryData {
  currentPage: 1;
  totalPages: 1;
  currentElements: 2;
  totalElements: 2;
  reviews: Summary[];
}

export interface Summary {
  bootcamp: string;
  averageRating: number;
  totalReviews: number;
}

export interface ReviewDetail {
  id: number;
  authorNickname: string;
  bootcamp: string;
  title: string;
  goodtags: string[];
  badtags: string[];
  rating: number;
  content: string;
}

export interface ReviewDetailResponseData {
  currentPage: number;
  totalPages: number;
  currentElements: number;
  totalElements: number;
  reviews: ReviewDetail[];
}

export interface ReviewDetailResponse {
  code: number;
  message: string;
  data: ReviewDetailResponseData;
}

class ReviewService {
  private endpoint = ENDPOINTS.reviews;

  post = async (review: ReviewRequest) => {
    const response = await instance.post<ReviewPostResponse>(this.endpoint, review);

    return response.data.data;
  };

  delete = async (id: number) => {
    const response = await instance.post<{
      code: number;
      message: string;
      data: null;
    }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  edit = async (review: ReviewRequest, id: number) => {
    const response = await instance.put<ReviewEditResponse>(`${this.endpoint}/${id}`, review);

    return response.data.data;
  };

  summary = async ({ page = 1, size = 6 }: { page?: number; size?: number }) => {
    const response = await instance.get<SummaryResponse>(
      `${this.endpoint}/summary?page=${page}&size=${size}`
    );

    return response.data.data;
  };

  detail = async ({
    sortBy = 'createdAt',
    bootcamp,
    page = 1,
  }: {
    sortBy?: 'rating' | 'createdAt';
    bootcamp: string;
    page?: number;
  }) => {
    const response = await instance.get<ReviewDetailResponse>(
      `${this.endpoint}?sortBy=${sortBy}&bootcamp=${bootcamp}&page=${page}`
    );

    return response.data.data;
  };
}

export default ReviewService;
