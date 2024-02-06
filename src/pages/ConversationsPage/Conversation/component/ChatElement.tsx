import AvatarConversation from '@/components/Conversation/AvatarConversation';
import NameConversation from '@/components/Conversation/NameConversation';

import { useGetMe } from '@/hooks';

import { cn, formatDateTime } from '@/lib/utils';
import { IDetailConversation } from '@/types';
import { Box, Text } from '@radix-ui/themes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
interface ChatElementProps {
  conversation: IDetailConversation;
}

const ChatElement: React.FC<ChatElementProps> = ({ conversation }) => {
  const { _id, id, lastActivity } = conversation;
  const { data: currentUser } = useGetMe();
  const { t } = useTranslation();
  const { conversationId } = useParams();
  return (
    <Link to={(_id || id)!}>
      <Box
        className={cn(
          'w-full rounded-xl p-4 bg-background  cursor-pointer relative',
          'hover:bg-custom_2 hover:dark:bg-primary-foreground transition-all ease-linear',
          conversationId === conversation._id && 'bg-custom_2 dark:bg-primary-foreground'
        )}
      >
        <Box className="flex flex-row items-center gap-4">
          <AvatarConversation
            isLoading={false}
            conversation={conversation}
            classNameAvatar="h-10 w-10"
          />
          <Box className="flex-1 flex flex-col gap-[0.2px]">
            <NameConversation
              isLoading={false}
              conversation={conversation}
              classNameText="text-lg font-semibold line-clamp-1"
            />
            <Text className="text-sm line-clamp-1">
              {lastActivity?.lastMessage?.senderId?.id === currentUser?.id ||
              lastActivity?.lastMessage?.senderId?._id === currentUser?.id
                ? t('message.message.you')
                : lastActivity?.lastMessage?.senderId.username}{' '}
              {lastActivity?.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'new' &&
                t('conversation.createdAConversation')}
              {lastActivity.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'change_avatar_group' &&
                t('conversation.changedTheGroupPicture')}
              {lastActivity.lastMessage?.type === 'update' &&
                lastActivity?.lastMessage?.title === 'change_name_group' &&
                t('conversation.changedTheGroupName')}
              {lastActivity?.lastMessage?.type === 'text' && t('conversation.sentAMessage')}
              {lastActivity?.lastMessage?.type === 'image' && t('conversation.sentPictures')}
              {lastActivity?.lastMessage?.type === 'gif' && t('conversation.sentAGIF')}
              {lastActivity?.lastMessage?.type === 'sticker' && t('conversation.sentASticker')}
            </Text>
          </Box>
          <Box className="flex flex-col">
            <h4 className="text-sm font-medium">
              {lastActivity?.lastMessage?.createdAt &&
                formatDateTime(lastActivity.lastMessage.createdAt)}
            </h4>
            {/* <h5 className=" inline-flex items-center  justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              2
            </h5> */}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ChatElement;
