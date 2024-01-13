import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';

interface FriendRequestElementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  friend: any;
}

const FriendRequestElement: React.FC<FriendRequestElementProps> = ({ friendRequest }) => {
  return (
    <Box
      className={cn(
        'w-full rounded-xl p-4 bg-white cursor-pointer relative',
        'dark:bg-[#161c24]',
        'hover:bg-gray-200 transition-all ease-linear'
      )}
    ></Box>
  );
};

export default FriendRequestElement;
