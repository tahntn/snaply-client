import { postAxios } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageMessage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postAxios<any, FormData>('upload', formData),
  });
};
