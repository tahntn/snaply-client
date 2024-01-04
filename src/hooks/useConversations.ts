import { getAxios } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useConversations = (limit = 2) => {
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
        console.log('lastPage', res);
        if (res.data.length > 0 && res.data.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};
