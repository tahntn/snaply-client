import { getAxios } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useConversations = (limit = 5) => {
  return useInfiniteQuery(
    ['conversation'],
    async ({ pageParam = 1 }) => {
      const res = await getAxios('/conversation', {
        page: pageParam,
        limit,
      });
      return res.data;
    },
    {
      getNextPageParam: (res: any) => {
        if (res.data.data.length > 0 && res.data.data.length === res.data.pagination.limit) {
          return res.data.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};
