import { getAxios } from '@/api';
import { IDetailConversation } from '@/types/conversation';
import { useQuery } from '@tanstack/react-query';
import { useToastError } from '.';

export const useDetailConversation = (conversationId: string) => {
  const { throwError } = useToastError();
  return useQuery(
    ['conversation', conversationId],
    () => getAxios<IDetailConversation | undefined>(`/conversation/${conversationId}`),
    {
      onError: (error) => {
        console.log('🚀 ~ useDetailConversation ~ error:', error);
        throwError(error);
      },
      retry: 0,
    }
  );
};
