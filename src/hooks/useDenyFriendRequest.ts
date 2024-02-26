import { toast } from 'sonner';
import { useFriendRequest } from '.';
import { useMutation } from '@tanstack/react-query';
import { postAxios } from '@/api';

const useDenyFriendRequest = (idFriendRequest: string) => {
  const { refetch } = useFriendRequest({
    type: 'friendRequests',
  });

  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/deny/${idFriendRequest}`);
    },
    onSuccess: () => {
      toast('Success', {
        description: 'Deny friend request successfully',
      });
      refetch();
    },
  });
};

export default useDenyFriendRequest;
