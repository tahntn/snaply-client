import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import AvatarUser from '@/components/AvatarUser';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '@/store';
import { IFriendRequest } from '@/types';

interface FriendRequestElementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  friendRequest: IFriendRequest;
}

const FriendRequestElement: React.FC<FriendRequestElementProps> = ({ friendRequest }) => {
  const { handleOpenDialogOtherUser } = useGlobalStore((state) => state);
  const { username, avatar } = friendRequest.user;
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
        <AvatarUser name={username} url={avatar} />

        <Box className="flex flex-col gap-[0.2px]">
          <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
            {username}
          </Text>
          <Text className="text-sm text-gray-400">{t('friendRequest.sendYouARequest')}</Text>
        </Box>
      </Box>
      <Box className="flex gap-2">
        <Check className="h-7 w-7 bg-green-400 p-1 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-linear duration-3000" />
        <X className="h-7 w-7 bg-red-400 p-1 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-linear duration-3000" />
      </Box>
    </Box>
  );
};

export default FriendRequestElement;
