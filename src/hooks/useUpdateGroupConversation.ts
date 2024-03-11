import { patchAxios } from '@/api';
import { IDetailConversation } from '@/types';
import { useMutation } from '@tanstack/react-query';

interface DataType {
  nameGroup?: string;
  avatarGroup?: string;
}

export const useUpdateGroupConversation = (
  conversationId: string,
  cb?: (data?: IDetailConversation) => void
) => {
  return useMutation({
    mutationFn: (data: DataType) =>
      patchAxios<IDetailConversation, DataType>(`conversation`, conversationId, data),
    onSuccess: (data) => {
      cb && cb(data);
    },
  });
};
