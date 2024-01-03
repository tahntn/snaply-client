import { getAxios } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useSearchUsers = () => {
  return useQuery(['users'], () => getAxios('/user/search', { q: 'nhat' }), {
    retry: 0,
  });
};

export default useSearchUsers;
