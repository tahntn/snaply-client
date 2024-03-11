import AvatarConversation from '@/components/Conversation/AvatarConversation';
import NameConversation from '@/components/Conversation/NameConversation';
import SkeletonText from '@/components/Skeleton/SkeletonText';
import { cn } from '@/lib/utils';
import { Box } from '@radix-ui/themes';
const ChatLoading = () => {
  return (
    <div className={cn('w-full rounded-xl p-4 bg-background')}>
      <div className="h-full flex flex-row items-center gap-4">
        <AvatarConversation isLoading={true} classNameAvatar="h-10 w-10" />
        <Box className="flex-1 flex flex-col gap-[0.2px]">
          <NameConversation isLoading={true} />
          <SkeletonText className="w-[50%] mt-3" />
        </Box>
      </div>
    </div>
  );
};

export default ChatLoading;
