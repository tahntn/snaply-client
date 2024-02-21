/* eslint-disable @typescript-eslint/no-explicit-any */
import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateFriendRequest = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetUserId: string) => postAxios(`friend/create/${targetUserId}`),
    onSuccess: (data: any) => {
      queryClient.setQueryData(['other-user', data.targetUserId], (prev: any) => ({
        data: prev.data,
        friendShip: data,
      }));
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Create friend request successfully',
      });
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
