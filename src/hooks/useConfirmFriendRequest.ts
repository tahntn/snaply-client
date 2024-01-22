import { postAxios } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useFriendRequest } from '.';

export const useConfirmFriendRequest = (idFriendRequest: string) => {
  const { toast } = useToast();
  const { refetch } = useFriendRequest({
    type: 'friendRequests',
  });

  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/confirm/${idFriendRequest}`);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Confirm friend request successfully',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response?.data?.message || 'Đã có lỗi xảy ra vui lòng thử lại.',
      });
    },
  });
};
