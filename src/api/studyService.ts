import { ENDPOINTS } from './apiConfig';
import { instance } from './client';

interface getStudiesParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

interface StudyResponse {
  code: number;
  message: string;
  data: {
    totalPages: number;
    isLastPage: boolean;
    totalStudies: number;
    studies: Study[];
  };
}

interface Study {
  id: number;
  title: string;
  content: string;
  skill: string;
  total: number;
  current: number;
  applicant: number;
  recruitmentStart: string;
  recruitmentEnd: string;
  progressStart: string;
  progressEnd: string;
  contact: string;
  nickname: string;
  categories: string[];
}

export interface CreateStudyData {
  title: string;
  content: string;
  skill: string;
  total: number;
  recruitmentEnd: string;
  progressStart: string;
  progressEnd: string;
  contact: string;
  categoryIds: number[];
}
export interface StudyApplication {
  id: number;
  status: string;
  studyId: number;
  applicantId: number;
  nickname: string;
  message: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface StudySuggestionsData {
  totalPages: number;
  isLastPage: boolean;
  totalStudySuggestions: number;
  studySuggestions: StudySuggestion[];
}

export interface StudySuggestion {
  studySuggestionId: number;
  status: string;
  studyId: number;
  memberId: number;
  nickname: string;
  message: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

class StudyService {
  private endpoint = ENDPOINTS.studies;

  getStudies = async ({ page = 0, pageSize = 10, orderBy = 'latest' }: getStudiesParams) => {
    const response = await instance.get<StudyResponse>(`${this.endpoint}`, {
      params: {
        page,
        pageSize,
        orderBy,
      },
    });

    return response.data;
  };

  getStudy = async (id: number) => {
    const response = await instance.get<{ data: Study }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  getCategories = async () => {
    const response = await instance.get<{ data: { id: number; name: string }[] }>(
      ENDPOINTS.categories
    );

    return response.data.data;
  };

  createStudy = async (study: CreateStudyData) => {
    const response = await instance.post(`${this.endpoint}`, study);

    return response.data;
  };

  applyStudy = async (id: number, message: string) => {
    const response = await instance.post<{ data: { studyApplicationId: number } }>(
      `${this.endpoint}/${id}`,
      {
        message,
      }
    );

    return response.data.data;
  };

  getApplications = async (studyId?: number, pageSize: number = 10, page: number = 0) => {
    const response = await instance.get<{ data: StudyApplication[] }>(
      `${this.endpoint}/applications`,
      {
        params: {
          studyId,
          pageSize,
          page,
        },
      }
    );

    return response.data.data;
  };

  getSuggestions = async (id?: number, pageSize: number = 10, page: number = 0) => {
    const response = await instance.get<{ data: StudySuggestionsData }>(
      `${this.endpoint}/suggestions`,
      {
        params: {
          id,
          pageSize,
          page,
        },
      }
    );

    return response.data.data;
  };
}

export default new StudyService();
