import AvatarUser from '@/components/AvatarUser';
import { useGetMe } from '@/hooks';
import { cn, formatDateTime } from '@/lib/utils';
import { IDetailConversation } from '@/types';
import { Box, Text } from '@radix-ui/themes';
import React from 'react';
import { Link } from 'react-router-dom';
interface ChatElementProps {
  conversation: IDetailConversation;
}

const ChatElement: React.FC<ChatElementProps> = ({ conversation }) => {
  const { participants, _id, id, isGroup, lastActivity, nameGroup, avatarGroup } = conversation;
  const { data: currentUser } = useGetMe();
  const targetUser = React.useMemo(() => {
    return participants.find(
      (user) => user._id !== currentUser?.id && user.id !== currentUser?.id
    )!;
  }, [participants, currentUser]);
  return (
    <Link to={(_id || id)!}>
      <Box
        className={cn(
          'w-full rounded-xl p-4 bg-white cursor-pointer relative',
          'dark:bg-[#161c24]',
          'hover:bg-gray-200 transition-all ease-linear'
        )}
      >
        <Box className="flex flex-row items-center gap-4">
          <AvatarUser
            name={!!isGroup ? nameGroup! : targetUser?.username}
            url={!!isGroup ? avatarGroup! : targetUser.avatar}
          />

          <Box className="flex flex-col gap-[0.2px]">
            <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
              {!!isGroup ? nameGroup : targetUser.username}
            </Text>
            <Text className="text-sm">
              {lastActivity?.lastMessage?.senderId?.username}{' '}
              {lastActivity.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'new' &&
                'đã tạo cuộc trò chuyện'}
              {lastActivity.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'change_avatar_group' &&
                'đã thay đổi ảnh nhóm'}
              {lastActivity.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'change_name_group' &&
                'đã thay đổi ảnh nhóm'}
              {lastActivity?.lastMessage?.type === 'text' && 'đã gửi một tin nhắn'}
              {lastActivity?.lastMessage?.type === 'image' && 'đã gửi một ảnh'}
              {lastActivity?.lastMessage?.type === 'gif' && 'đã gửi một gif'}
              {lastActivity?.lastMessage?.type === 'sticker' && 'đã gửi một nhãn dán'}
            </Text>
          </Box>
        </Box>
        <Text className="text-sm absolute top-3 right-4">
          {lastActivity?.lastMessage?.createdAt &&
            formatDateTime(lastActivity.lastMessage.createdAt)}
        </Text>
        <span className="absolute bottom-3 right-4 inline-flex items-center  justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          2
        </span>
      </Box>
    </Link>
  );
};

export default ChatElement;
