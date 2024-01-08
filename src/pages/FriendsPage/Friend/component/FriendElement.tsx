import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import AvatarUser from '@/components/AvatarUser';

interface FriendElementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  friend: any;
}

const FriendElement: React.FC<FriendElementProps> = ({ friend }) => {
  const { avatar, username, email } = friend!.user;

  return (
    <Box
      className={cn(
        'w-full rounded-xl p-4 bg-white cursor-pointer relative',
        'dark:bg-[#161c24]',
        'hover:bg-gray-200 transition-all ease-linear'
      )}
    >
      <Box className="flex flex-row items-center gap-4">
        <AvatarUser name={username ?? ''} url={avatar ?? ''} />
        <Box className="flex flex-col gap-[0.2px]">
          <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
            {username ?? ''}
          </Text>
          <Text className="text-sm">{email ?? ''}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FriendElement;
