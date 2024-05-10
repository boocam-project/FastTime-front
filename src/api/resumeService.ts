import { ENDPOINTS } from './apiConfig';
import { instance } from './client';

export interface Resume {
  id: number;
  title: string;
  content: string;
  writer: string;
  likeCount: number;
  viewCount: number;
  createdAt: string | null;
  lastModifiedAt: string | null;
  deletedAt: string | null;
}

export interface CreateResumeData {
  title: string;
  content: string;
}

class ResumeService {
  private endpoint = ENDPOINTS.resume;

  getResumes = async () => {
    const response = await instance.get<{ data: Resume[] }>(`${this.endpoint}`);

    return response.data.data;
  };

  getResume = async (id: number) => {
    const response = await instance.get<{ data: Resume }>(`${this.endpoint}/${id}`);

    return response.data.data;
  };

  update = async (resume: CreateResumeData, id: number) => {
    const response = await instance.put(`${this.endpoint}/${id}`, resume);

    return response.data;
  };

  delete = async (id: number) => {
    const response = await instance.delete(`${this.endpoint}/${id}`);

    return response.data;
  };

  create = async (resume: CreateResumeData) => {
    const response = await instance.post(`${this.endpoint}/create`, resume);

    return response.data;
  };

  like = async (id: number) => {
    const response = await instance.post(`${this.endpoint}/${id}/like`);

    return response.data;
  };
}

export default new ResumeService();
