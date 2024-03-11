/* eslint-disable @typescript-eslint/no-explicit-any */
import { postAxios } from '@/api';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { idOtherUser } from '@/types';

export const useConfirmFriendRequest = (idFriendRequest: string, idOtherUser?: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: () => {
      return postAxios(`/friend/confirm/${idFriendRequest}`);
    },
    onSuccess: () => {
      const listFriendRequest = queryClient.getQueryData(['friendRequest']);
      if (listFriendRequest) {
        queryClient.setQueryData(['friendRequest'], (oldData: any) => {
          const updatedPages = oldData.pages.map((page: any) => ({
            data: page.data.filter((message: any) => {
              return message._id !== idFriendRequest;
            }),
          }));

          return {
            pageParams: oldData.pageParams,
            pages: updatedPages.map((page: any, index: number) => ({
              data: page.data,
              pagination: oldData.pages?.[index]?.pagination,
            })),
          };
        });
      }

      if (idOtherUser) {
        const otherUser = queryClient.getQueryData(['other-user', idOtherUser]) as
          | idOtherUser
          | undefined;
        if (otherUser) {
          queryClient.setQueryData(['other-user', idOtherUser], () => {
            const newData = {
              ...otherUser,
              friendShip: {
                ...otherUser.friendShip,
                status: 'accept',
              },
            };
            return newData;
          });
        }
      }

      const totalFriend = queryClient.getQueryData(['total-friend']) as number | undefined;
      if (totalFriend) {
        queryClient.setQueryData(['total-friend'], () => totalFriend + 1);
      }

      const totalFriendRequest = queryClient.getQueryData(['total-friend-request']) as
        | number
        | undefined;
      if (totalFriendRequest) {
        queryClient.setQueryData(['total-friend-request'], () => totalFriendRequest - 1);
      }
      toast.success(t('friend.confirmFriendRequestSuccess'));
    },
  });
};
