import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { useGlobalStore } from '@/store';
import { useMutation } from '@tanstack/react-query';

export const useCreateFriendRequest = () => {
  const handleCloseDialogOtherUser = useGlobalStore((state) => state.handleCloseDialogOtherUser);
  const { toast } = useToast();
  return useMutation({
    mutationFn: (targetUserId: string) => postAxios(`friend/create/${targetUserId}`),
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Create friend request successfully',
      });
      handleCloseDialogOtherUser();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng đăng nhập lại',
      });
    },
  });
};
