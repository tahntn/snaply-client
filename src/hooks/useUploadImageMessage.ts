import { postAxios } from '@/api';
import { IResMessage } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageMessage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postAxios<IResMessage[], FormData>('upload', formData),
  });
};
