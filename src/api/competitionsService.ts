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
  corporate_type: string;
  participate: string;
  award_scale: string;
  start_date: string;
  end_date: string;
  homepageUrl: string;
  activity_benefit: string;
  bonus_benefit: string;
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
    const response = await instance.get<CompetitionApiResponse>(
      `${this.endpoint}?keyword=${keyword}&before=${before}&continue=${continues}&after=${after}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
    );

    return response.data.data;
  };

  getOne = async (id: number) => {
    const response = await instance.get<CompetitionDetailApiResponse>(`${this.endpoint}/${id}`);

    return response.data.data;
  };
}

export default CompetitionsService;
