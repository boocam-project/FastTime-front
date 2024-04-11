import { ENDPOINTS } from './apiConfig';
import { instance } from './client';

interface Resume {
  title: string;
  introduction: string;
  skill: string;
  project: any;
  study: any;
}

class ResumeService {
  private endpoint = ENDPOINTS.resume;

  getResume = async () => {
    const response = await instance.get<{ data: Resume }>(`${this.endpoint}`);

    return response.data;
  };

  update = async (resume: any, id: number) => {
    const response = await instance.put(`${this.endpoint}/${id}`, resume);

    return response.data;
  };

  delete = async (id: number) => {
    const response = await instance.delete(`${this.endpoint}/${id}`);

    return response.data;
  };

  create = async (resume: any) => {
    const response = await instance.post(`${this.endpoint}`, resume);

    return response.data;
  };
}

export default new ResumeService();
