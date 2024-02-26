import { postAxios } from '@/api';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useFriendRequest } from '.';

export const useConfirmFriendRequest = (idFriendRequest: string) => {
  const { refetch } = useFriendRequest({
    type: 'friendRequests',
  });

  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/confirm/${idFriendRequest}`);
    },
    onSuccess: () => {
      toast.success('Success', {
        description: 'Confirm friend request successfully',
      });
      refetch();
    },
  });
};
