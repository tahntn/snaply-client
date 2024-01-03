import { storage } from '@/lib/storage';
import { logoutService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { setLogout } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: (refreshToken: string) => {
      return logoutService(refreshToken);
    },
    onSettled: () => {
      queryClient.clear();
      storage.clearString('snalpy-access');
      storage.clearString('snalpy-refresh');
      setLogout();
    },
  });
};
