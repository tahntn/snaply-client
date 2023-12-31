import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { storage } from '@/lib/storage';
import { useAuthStore } from '@/store';
import { loginBody } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useLogin = () => {
  const { toast } = useToast();
  const { setAccessToken, setRefreshToken, setLogin } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: (user: loginBody) => {
      return postAxios<any>('/auth/login', user);
    },
    onSuccess: ({ data }) => {
      const {
        data: { tokens },
      } = data;
      const { access, refresh } = tokens;
      if (access && refresh) {
        storage.setString('snalpy-access', access?.token);
        storage.setString('snalpy-refresh', refresh?.token);
        setAccessToken(access?.token);
        setRefreshToken(access?.token);
        setLogin();
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.2',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
