/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import AvatarUser from '@/components/AvatarUser';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfirmFriendRequest } from '@/hooks/useConfirmFriendRequest';
import useDenyFriendRequest from '@/hooks/useDenyFriendRequest';
import { IDataFriendRequest } from '@/types/friendRequest';
import { useGlobalStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';

interface FriendRequestElementProps {
  friendRequest: IDataFriendRequest;
}

const FriendRequestElement: React.FC<FriendRequestElementProps> = ({ friendRequest }) => {
  const queryClient = useQueryClient();
  const { handleOpenDialogOtherUser } = useGlobalStore((state) => state);
  const { username, avatar } = friendRequest.user;
  const { mutate: confirmFriendRequest } = useConfirmFriendRequest(friendRequest._id!, () => {
    const listFriendRequest = queryClient.getQueryData(['friendRequest']);
    if (listFriendRequest) {
      queryClient.setQueryData(['friendRequest'], (oldData: any) => {
        const updatedPages = oldData.pages.map((page: any) => ({
          data: page.data.filter((message: any) => {
            return message._id !== friendRequest._id;
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
  });
  const { mutate: denyFriendRequest } = useDenyFriendRequest(friendRequest._id!);

  const { t } = useTranslation();

  return (
    <Box
      className={cn(
        'w-full rounded-xl p-3 bg-white cursor-pointer relative flex items-center justify-between',
        'dark:bg-black_custom-600',
        'hover:bg-gray-200 transition-all ease-linear'
      )}
    >
      <Box
        className="flex flex-row items-center gap-4"
        onClick={() => handleOpenDialogOtherUser(friendRequest.user.id! || friendRequest.user._id!)}
      >
        <AvatarUser name={username} url={avatar} classNameAvatar="w-7 h-7" />

        <Box className="flex flex-col gap-[0.2px]">
          <Text className="text-base font-semibold truncate max-w-[320px]">{username}</Text>
          <Text className="text-sm text-gray-400">{t('friendRequest.sendYouARequest')}</Text>
        </Box>
      </Box>
      <Box className="flex gap-2">
        <Check
          className="h-7 w-7 bg-green-400 p-1 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-linear duration-3000"
          onClick={() => confirmFriendRequest()}
        />
        <X
          className="h-7 w-7 bg-red-400 p-1 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-linear duration-3000"
          onClick={() => denyFriendRequest()}
        />
      </Box>
    </Box>
  );
};

export default FriendRequestElement;
