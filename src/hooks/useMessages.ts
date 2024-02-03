import { getAxios } from '@/api';
import { IMessages } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMessages = (conversationId: string, limit = 10) => {
  return useInfiniteQuery(
    ['messages', conversationId],
    async ({ pageParam = 1 }) => {
      const res = await getAxios<IMessages>(`/conversation/${conversationId}/message`, {
        page: pageParam,
        limit,
      });
      return res;
    },
    {
      getNextPageParam: (res) => {
        if (res.data?.length > 0 && res.data?.length === res.pagination.limit) {
          return res.pagination.page! + 1;
        }
        return undefined;
      },
      refetchOnMount: true,
      staleTime: 1000,
    }
  );
};
