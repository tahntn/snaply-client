import { getAxios } from '@/api';
import { IDetailConversation } from '@/types/conversation';
import { useQuery } from '@tanstack/react-query';

export const useDetailConversation = (conversationId: string) => {
  return useQuery(
    ['conversation', conversationId],
    () => getAxios<IDetailConversation | undefined>(`/conversation/${conversationId}`),
    {
      retry: 0,
    }
  );
};
