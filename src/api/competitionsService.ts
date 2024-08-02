import { instance } from './client';
import { ENDPOINTS } from './apiConfig';

interface CompetitionApiResponse {
  code: number;
  message: string;
  data: CompetitionsData;
}

interface CompetitionsData {
  totalPages: number;
  isLastPage: boolean;
  totalCompetitions: number;
  competitions: Competition[];
}

interface Competition {
  id: number;
  title: string;
  organization: string;
  imageUrl: string;
  dDay: number;
}

interface CompetitionDetailApiResponse {
  code: number;
  message: string;
  data: CompetitionDetail;
}

interface CompetitionDetail {
  id: number;
  title: string;
  organization: string;
  corporateType: string;
  participate: string;
  awardScale: string;
  startDate: string;
  endDate: string;
  homepageUrl: string;
  activityBenefit: string;
  bonusBenefit: string;
  description: string;
  imageUrl: string;
}

export interface CompetitionsQuery {
  keyword?: null | string;
  before?: boolean;
  continues?: boolean;
  after?: boolean;
  orderBy?: 'latest' | 'd-day';
  page?: number;
  pageSize?: number;
}

class CompetitionsService {
  private endpoint = ENDPOINTS.competitions;

  getAll = async ({
    keyword = null,
    before = true,
    continues = true,
    after = false,
    orderBy = 'latest',
    page = 1,
    pageSize = 10,
  }: CompetitionsQuery) => {
    if (keyword === '' || keyword === null) {
      const response = await instance.get<CompetitionApiResponse>(
        `${this.endpoint}?before=${before}&continue=${continues}&after=${after}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
      );
      return response.data.data;
    } else {
      const response = await instance.get<CompetitionApiResponse>(
        `${this.endpoint}?keyword=${keyword}&before=${before}&continue=${continues}&after=${after}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
      );
      return response.data.data;
    }
  };

  getOne = async (id: number) => {
    const response = await instance.get<CompetitionDetailApiResponse>(`${this.endpoint}/${id}`);

    return response.data.data;
  };
}

export default CompetitionsService;
