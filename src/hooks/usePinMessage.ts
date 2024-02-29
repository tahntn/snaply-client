import { postAxios } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const usePinMessage = (conversationId: string, messageId: string, cb?: () => void) => {
  return useMutation({
    mutationFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      postAxios<any, any>(`conversation/${conversationId}/message/${messageId}/pin`),
    onSuccess: () => {
      cb && cb();
    },
  });
};
