import AvatarUser from '@/components/AvatarUser';
import { cn } from '@/lib/utils';
import { Box, Text } from '@radix-ui/themes';
import moment from 'moment';
import { Link } from 'react-router-dom';
interface ChatElementProps {
  conversation: any;
}

const ChatElement: React.FC<ChatElementProps> = ({ conversation }) => {
  const { participants, _id, isGroup, lastActivity, nameGroup, avatarGroup } = conversation;

  return (
    <Link to={_id}>
      <Box
        className={cn(
          'w-full rounded-xl p-4 bg-white cursor-pointer relative',
          'dark:bg-[#161c24]',
          'hover:bg-gray-200 transition-all ease-linear'
        )}
      >
        <Box className="flex flex-row items-center gap-4">
          <AvatarUser
            name={!!isGroup ? nameGroup : participants?.[1].username}
            url={!!isGroup ? avatarGroup : participants?.[1].avatar}
          />

          <Box className="flex flex-col gap-[0.2px]">
            <Text className="text-base font-semibold truncate max-w-[320px] opacity-0 lg:opacity-100">
              {!!isGroup ? nameGroup : participants?.[1].username}
            </Text>
            <Text className="text-sm">
              {lastActivity?.senderId?.username}{' '}
              {lastActivity?.type === 'init' && 'đã tạo cuộc trò chuyện'}
              {lastActivity?.type === 'text' && 'đã gửi một tin nhắn'}
              {lastActivity?.type === 'image' && 'đã gửi một ảnh'}
            </Text>
          </Box>
        </Box>
        <Text className="text-sm absolute top-3 right-4">
          {lastActivity?.timestamp && moment(lastActivity.timestamp).format('HH:mm')}
        </Text>
        <span className="absolute bottom-3 right-4 inline-flex items-center  justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          2
        </span>
      </Box>
    </Link>
  );
};

export default ChatElement;
