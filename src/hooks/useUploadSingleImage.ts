import { postAxios } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadSingleImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      postAxios<{ url: string }, FormData>('upload/single-image', formData),
  });
};
