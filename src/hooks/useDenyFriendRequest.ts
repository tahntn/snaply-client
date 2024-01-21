import { useToast } from '@/components/ui/use-toast';
import { useFriendRequest } from '.';
import { useMutation } from '@tanstack/react-query';
import { postAxios } from '@/api';

const useDenyFriendRequest = (idFriendRequest: string) => {
  const { toast } = useToast();
  const { refetch } = useFriendRequest({
    type: 'friendRequests',
  });

  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/deny/${idFriendRequest}`);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Deny friend request successfully',
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

export default useDenyFriendRequest;
