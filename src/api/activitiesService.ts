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
  corporateType: string;
  participate: string;
  startDate: string;
  endDate: string;
  period: string;
  recruitment: string;
  area: string;
  preferredSkills: string;
  homepageUrl: string;
  activityBenefit: string;
  activityField: string;
  bonusBenefit: string;
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

class ActivitiesService {
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
    console.log(this.endpoint);
    if (keyword === '' || keyword === null) {
      const response = await instance.get<ActivitiesResponse>(
        `${this.endpoint}?before=${before}&during=${during}&closed=${closed}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
      );
      return response.data.data;
    } else {
      const response = await instance.get<ActivitiesResponse>(
        `${this.endpoint}?keyword=${keyword}&before=${before}&during=${during}&closed=${closed}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
      );
      return response.data.data;
    }
  };

  getOne = async (id: number) => {
    const response = await instance.get<DetailActivitiesResponse>(`${this.endpoint}/${id}`);

    return response.data.data;
  };
}

export default ActivitiesService;
