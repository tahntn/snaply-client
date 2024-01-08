import { getAxios } from '@/api';
import { IUser } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetMe = () => {
  return useQuery(['me'], () => getAxios<IUser>('/user/get-me'), {
    retry: 0,
  });
};
