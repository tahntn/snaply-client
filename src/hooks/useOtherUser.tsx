import { getAxios } from '@/api';
import { idOtherUser } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useOtherUser = (userId?: string) => {
  return useQuery(['other-user', userId], () => getAxios<idOtherUser>(`/user/${userId}`), {
    staleTime: 1000 * 30, // 30 seconds
    enabled: !!userId,
  });
};
