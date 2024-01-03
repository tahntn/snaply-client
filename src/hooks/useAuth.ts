import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { storage } from '@/lib/storage';
import { useAuthStore } from '@/store';
import { loginBody, signupBody } from '@/types';
import { useMutation } from '@tanstack/react-query';

type UserBodyType<T extends 'login' | 'register'> = T extends 'login' ? loginBody : signupBody;
export const useAuth = (type: 'login' | 'register') => {
  const { toast } = useToast();
  const { setLogin } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: (user: UserBodyType<typeof type>) => {
      return postAxios<any>(`auth/${type}`, user);
    },
    onSuccess: ({ data }) => {
      const {
        data: { tokens },
      } = data;
      const { access, refresh } = tokens;
      if (access && refresh) {
        storage.setString('snalpy-access', access?.token);
        storage.setString('snalpy-refresh', refresh?.token);
        setLogin();
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
