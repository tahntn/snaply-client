import { getAxios } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IProps {
  limit?: number;
  type?: string;
}

export const useFriends = ({ limit = 5, type }: IProps = {}) => {
  return useInfiniteQuery(
    ['friends/list'],
    async ({ pageParam = 1 }) => {
      const res = await getAxios(`/friend/list`, {
        page: pageParam,
        limit,
        type,
      });
      return res.data;
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getNextPageParam: (res: any) => {
        if (res.data.length > 0 && res.data.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};
