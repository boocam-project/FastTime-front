import { useMutation, useQuery } from '@tanstack/react-query';
import studyService, { CreateStudyData } from '@/api/studyService';

export const useGetStudies = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['studies'],
    queryFn: () => studyService.getStudies({}),
  });

  return { isLoading, data, error };
};

export const useGetStudy = (id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['study', id],
    queryFn: () => studyService.getStudy(id),
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
  const { mutate, error, isPending } = useMutation({
    mutationKey: ['createStudy'],
    mutationFn: (study: CreateStudyData) => studyService.createStudy(study),
  });

  return { mutate, error, isPending };
};
