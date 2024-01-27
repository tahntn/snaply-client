import { getAxios } from '@/api';
import { ISearchUser } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const useSearchUsers = (q: string, limit = 10) => {
  return useInfiniteQuery(
    ['messages', q],
    async ({ pageParam = 1 }) => {
      if (!!q) {
        const res = await getAxios<ISearchUser>('/user/search', {
          q,
          page: pageParam,
          limit,
        });
        return res;
      }
      return {
        data: [],
        pagination: {
          page: 1,
          limit,
        },
      };
    },
    {
      getNextPageParam: (res) => {
        if (res.data?.length > 0 && res.data?.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};

export default useSearchUsers;
