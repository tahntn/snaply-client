import { postAxios } from '@/api';
import { IFriend, idOtherUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useCreateFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetUserId: string) =>
      postAxios<IFriend, { id: string }>(`friend/create/${targetUserId}`),
    onSuccess: (data) => {
      queryClient.setQueryData(['other-user', data.targetUserId], (prev?: idOtherUser) => ({
        ...prev!,
        friendShip: data,
      }));
      toast.success(
        'Success',

        {
          description: 'Create friend request successfully',
        }
      );
    },
  });
};
