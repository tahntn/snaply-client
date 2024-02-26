/* eslint-disable @typescript-eslint/no-explicit-any */
import { postAxios } from '@/api';
import { storage } from '@/lib/storage';
import { useAuthStore } from '@/store';
import { loginBody, signupBody } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
type UserBodyType<T extends 'login' | 'register'> = T extends 'login' ? loginBody : signupBody;
export const useAuth = (type: 'login' | 'register') => {
  const { setLogin } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: (user: UserBodyType<typeof type>) => {
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
    onError: (error: any) => {
      toast.error('Uh oh! Something went wrong.', {
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
