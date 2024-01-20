import { Box, Text } from '@radix-ui/themes';
import { cn } from '@/lib/utils';
import AvatarUser from '@/components/AvatarUser';
import { Ban, MoreVertical, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGlobalStore } from '@/store';

interface FriendElementProps {
  friend: {
    id?: string;
    avatar?: string;
    username?: string;
    _id?: string;
  };
}

const FriendElement: React.FC<FriendElementProps> = ({ friend }) => {
  const { handleOpenDialogOtherUser } = useGlobalStore((state) => state);
  const { avatar, username } = friend;

  return (
    <Box className={cn('w-full cursor-pointer relative flex items-center justify-between')}>
      <Box className="flex flex-row items-center gap-2">
        <AvatarUser name={username ?? ''} url={avatar ?? ''} />
        <Box
          className="flex flex-col gap-[0.2px]"
          onClick={() => handleOpenDialogOtherUser(friend.id! || friend._id!)}
        >
          <Text className="text-sm font-medium truncate max-w-[320px] opacity-0 lg:opacity-100">
            {username ?? ''}
          </Text>
        </Box>
      </Box>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="left-[3%]">
          <DropdownMenuItem className="flex justify-between cursor-pointer">
            Block
            <Ban className="h-5" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between cursor-pointer text-red-400 focus:text-red-400">
            Remove
            <Trash2 className="h-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  );
};

export default FriendElement;
