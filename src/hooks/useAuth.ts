import { postAxios } from '@/api';
import { storage } from '@/lib/storage';
import { useAuthStore } from '@/store';
import { loginBody, signupBody } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useToastError } from '.';
type UserBodyType<T extends 'login' | 'register'> = T extends 'login' ? loginBody : signupBody;
export const useAuth = (type: 'login' | 'register') => {
  const { setLogin } = useAuthStore((state) => state);
  const { throwError } = useToastError();
  return useMutation({
    mutationFn: (user: UserBodyType<typeof type>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return postAxios<any, any>(`auth/${type}`, user);
    },
    onSuccess: ({ data }) => {
      const { access, refresh } = data;
      if (access && refresh) {
        storage.setString('snalpy-access', access?.token);
        storage.setString('snalpy-refresh', refresh?.token);
        setLogin();
      }
    },
    onError: (error) => throwError(error),
  });
};
