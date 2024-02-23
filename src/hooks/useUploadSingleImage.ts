import { postAxios } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadSingleImage = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (formData: FormData) => postAxios<any, FormData>('single-image', formData),
  });
};
