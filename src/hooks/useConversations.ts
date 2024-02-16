import { getAxios } from '@/api';
import { IConversations } from '@/types';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const useConversations = (limit = 10) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    ['conversation'],
    async ({ pageParam = 0 }) => {
      const res = await getAxios<IConversations>('/conversation', {
        offset: pageParam,
        limit,
      });
      return res;
    },
    {
      getNextPageParam: (res) => {
        if (res.data?.length > 0 && res.data?.length === res.pagination.limit) {
          const dataConversation: InfiniteData<IConversations> | undefined =
            queryClient.getQueryData(['conversation']);
          const total = dataConversation?.pages?.reduce((total, item) => {
            return total + item.data.length;
          }, 0);
          return total;
        }
        return undefined;
      },
      refetchOnMount: true,
      staleTime: 1000,
      cacheTime: 0,
    }
  );
};
