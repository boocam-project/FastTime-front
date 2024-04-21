import { instance } from './client';
import { ENDPOINTS } from './apiConfig';

interface ActivitiesResponse {
  code: number;
  message: string;
  data: ActivitiesData;
}

interface ActivitiesData {
  totalPages: number;
  isLastPage: boolean;
  totalActivities: number;
  activities: Activity[];
}

interface Activity {
  id: number;
  title: string;
  organization: string;
  imageUrl: string;
  dDay: number;
}

interface DetailActivitiesResponse {
  code: number;
  message: string;
  data: ActivityDetail;
}

interface ActivityDetail {
  id: number;
  title: string;
  organization: string;
  corporate_type: string;
  participate: string;
  start_date: string;
  end_date: string;
  period: string;
  recruitment: string;
  area: string;
  preferred_skills: string;
  homepageUrl: string;
  activity_benefit: string;
  activity_field: string;
  bonus_benefit: string;
  description: string;
  imageUrl: string;
}

export interface ActivitiesQuery {
  keyword?: null | string;
  before?: boolean;
  during?: boolean;
  closed?: boolean;
  orderBy?: 'latest' | 'd-day';
  page?: number;
  pageSize?: number;
}

class activitiesService {
  private endpoint = ENDPOINTS.activities;

  getAll = async ({
    keyword = null,
    before = true,
    during = true,
    closed = false,
    orderBy = 'latest',
    page = 1,
    pageSize = 10,
  }: ActivitiesQuery) => {
    const response = await instance.get<{ data: ActivitiesResponse }>(
      `${this.endpoint}?keyword=${keyword}&before=${before}&during=${during}&closed=${closed}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
    );

    return response.data.data;
  };

  getOne = async (id: number) => {
    const response = await instance.get<{ data: DetailActivitiesResponse }>(
      `${this.endpoint}/${id}`
    );

    return response.data.data;
  };
}

export default activitiesService;
