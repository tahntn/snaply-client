import { getAxios } from '@/api';
import { IFriendSearch } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFriends = (q: string, limit: number = 5) => {
  return useInfiniteQuery(
    ['friends', q],
    async ({ pageParam = 1 }) => {
      const res = await getAxios<IFriendSearch>('/friend/list-v2', {
        q: q || undefined,
        page: pageParam,
        limit,
      });
      return res;
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getNextPageParam: (res: any) => {
        if (res.data?.length > 0 && res.data?.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};
