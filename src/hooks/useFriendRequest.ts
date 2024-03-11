import { getAxios } from '@/api';
import { IFriendRequest } from '@/types/friendRequest';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IProps {
  limit?: number;
  type?: string;
}

export const useFriendRequest = ({ limit = 5, type }: IProps = {}) => {
  return useInfiniteQuery(
    [type === 'friendRequests' ? 'friendRequest' : 'friend'],
    async ({ pageParam = 1 }) => {
      const res = await getAxios<IFriendRequest>('/friend/list', {
        page: pageParam,
        limit,
        type,
      });
      return res;
    },
    {
      getNextPageParam: (res) => {
        if (res.data.length > 0 && res.data.length === res.pagination.limit) {
          return res.pagination.page + 1;
        }
        return undefined;
      },
    }
  );
};
