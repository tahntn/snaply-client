import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAxios } from '@/api';
import { useTranslation } from 'react-i18next';

const useDenyFriendRequest = (idFriendRequest: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/deny/${idFriendRequest}`);
    },
    onSuccess: () => {
      onSuccess();
      const totalFriendRequest = queryClient.getQueryData(['total-friend-request']) as
        | number
        | undefined;
      if (totalFriendRequest) {
        queryClient.setQueryData(['total-friend-request'], () => totalFriendRequest - 1);
      }
      toast.success(t('friend.denyFriendRequestSuccess'));
    },
  });
};

export default useDenyFriendRequest;
