import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import studyService, { CreateStudyData } from '@/api/studyService';
import { useNavigate } from 'react-router-dom';

export const useGetStudies = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['studies'],
    queryFn: () => studyService.getStudies({}),
  });

  return { isLoading, data, error };
};

export const useGetStudy = (id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['studies', id],
    queryFn: () => studyService.getStudy(id),
    enabled: !!id,
  });

  return { isLoading, data, error };
};

export const useGetCategories = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => studyService.getCategories(),
  });

  return { isLoading, data, error };
};

export const useCreateStudy = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['createStudy'],
    mutationFn: (study: CreateStudyData) => studyService.create(study),
    onSuccess: (data) => {
      const studyId = data.split('/').pop();
      navigate(`/study/${studyId}`);
    },
  });
};

export const useUpdateStudy = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateStudy'],
    mutationFn: ({ study, id }: { study: CreateStudyData; id: number }) =>
      studyService.update(study, id),
    onSuccess: (_, variables) => {
      navigate(`/study/${variables.id}`);
      queryClient.invalidateQueries({ queryKey: ['studies', variables.id], refetchType: 'all' });
    },
  });
};

export const useDeleteStudy = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['deleteStudy'],
    mutationFn: (id: number) => studyService.delete(id),
    onSuccess: () => {
      navigate('/study');
      queryClient.invalidateQueries({ queryKey: ['studies'], refetchType: 'all' });
    },
  });

  return { mutate, error, isPending };
};

export const useGetApplications = (studyId?: number, pageSize?: number, page?: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['applicants', studyId],
    queryFn: () => studyService.getApplications(studyId, pageSize, page),
  });

  return { isLoading, data, error };
};

export const useGetSuggestions = (id?: number, pageSize?: number, page?: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => studyService.getSuggestions(id, pageSize, page),
  });

  return { isLoading, data, error };
};

export const useApplyStudy = () => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: ['applyStudy'],
    mutationFn: ({ id, message }: { id: number; message: string }) =>
      studyService.apply(id, message),
  });

  return { mutate, error, isPending };
};
