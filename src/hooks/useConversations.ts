import { getAxios } from '@/api';
import { IConversations } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useConversations = (limit = 5) => {
  return useInfiniteQuery(
    ['conversation'],

    async ({ pageParam = 1 }) => {
      const res = await getAxios<IConversations>('/conversation', {
        page: pageParam,
        limit,
      });
      return res;
    },
    {
      getNextPageParam: (res) => {
        if (res.data?.length > 0 && res.data?.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
      refetchOnMount: true,
      staleTime: 1000,
    }
  );
};
