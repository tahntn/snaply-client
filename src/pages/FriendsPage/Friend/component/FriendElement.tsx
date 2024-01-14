import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import AvatarUser from '@/components/AvatarUser';

interface FriendElementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  friend: any;
}

const FriendElement: React.FC<FriendElementProps> = ({ friend }) => {
  const { avatar, username } = friend;

  return (
    <Box className={cn('w-full cursor-pointer relative')}>
      <Box className="flex flex-row items-center gap-4">
        <AvatarUser name={username ?? ''} url={avatar ?? ''} className="rounded-none" />
        <Box className="flex flex-col gap-[0.2px]">
          <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
            {username ?? ''}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FriendElement;
