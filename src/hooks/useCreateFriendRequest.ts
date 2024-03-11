import { postAxios } from '@/api';
import { IFriend, idOtherUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
export const useCreateFriendRequest = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (targetUserId: string) =>
      postAxios<IFriend, { id: string }>(`friend/create/${targetUserId}`),
    onSuccess: (data) => {
      queryClient.setQueryData(['other-user', data.targetUserId], (prev?: idOtherUser) => ({
        ...prev!,
        friendShip: data,
      }));
      toast.success(t('friend.createFriendRequestSuccess'));
    },
  });
};
