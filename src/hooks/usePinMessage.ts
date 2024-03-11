import { postAxios } from '@/api';
import { IMessage } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const usePinMessage = (
  conversationId: string,
  messageId: string,
  cb?: (data: IMessage) => void
) => {
  return useMutation({
    mutationFn: () =>
      postAxios<IMessage, object>(`conversation/${conversationId}/message/${messageId}/pin`),
    onSuccess: (data) => {
      cb && cb(data);
    },
  });
};
