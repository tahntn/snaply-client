import { getAxios } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalFriend = (type?: 'friendRequests' | undefined) => {
  return useQuery([type === 'friendRequests' ? 'total-friend-request' : ''], () =>
    getAxios<number>('/friend/total', {
      type,
    })
  );
};
