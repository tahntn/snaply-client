import { getAxios } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useDetailConversation = (conversationId: string) => {
  return useQuery(
    ['conversation', conversationId],
    () => getAxios(`/conversation/${conversationId}`),
    {
      retry: 0,
    }
  );
};
