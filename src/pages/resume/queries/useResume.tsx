import { useMutation, useQuery } from '@tanstack/react-query';
import api, { CreateResumeData } from '@/api/resumeService';

export const useGetResumes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['resume'],
    queryFn: () => api.getResumes(),
  });

  return { data, isLoading, error };
};

export const useGetResume = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => api.getResume(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
};

export const useCreateResume = () => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: ['createResume'],
    mutationFn: (resume: CreateResumeData) => api.create(resume),
  });

  return { mutate, error, isPending };
};
