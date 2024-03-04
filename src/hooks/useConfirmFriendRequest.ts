import { postAxios } from '@/api';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useConfirmFriendRequest = (idFriendRequest: string, onSuccess: () => void) => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/confirm/${idFriendRequest}`);
    },
    onSuccess: () => {
      toast.success(t('friend.confirmFriendRequestSuccess'));
      onSuccess();
    },
  });
};
